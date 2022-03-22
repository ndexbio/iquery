import React, { useState } from 'react'
import Linkify from 'linkify-react'
import parse from 'html-react-parser'
import { isEqual } from 'lodash'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import ExpandPanel from './ExpandPanel'

import { camelCaseToTitleCase } from './camel-case-util.js'
import { stripScripts } from './strip-scripts-util.js'

import { MAX_NETWORK_SIZE } from '../../../api/config'

let index = 0

const useStyles = makeStyles(theme => ({
  noPadding: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%'
  },
  wideList: {
    marginTop: '0',
    width: '100%',
    padding: '0'
  },
  table: {
    width: '100%',
    tableLayout: 'fixed'
  },
  matched: {
    backgroundColor: '#C51162',
    height: '1em',
    width: '1em'
  },
  icon: {
    height: '0.5em',
    weidth: '0.5em'
  }
}))


const EdgeProperties = props => {
  const classes = useStyles()

  const context = props.context
  const listProperties = props.listProperties
  const [defaultExpanded, setDefaultExpanded] = useState(true)
  
  if ((props.network.nodeCount + props.network.edgeCount) > MAX_NETWORK_SIZE){
    return (
      <div className={'outer-rectangle'}>
        <div className={classes.center}>
          <Typography color="textSecondary" variant="subtitle1">
            Network to big to display edges
          </Typography>
        </div>
      </div>
    ) 
  }

  let edges
  if (props.network.selectedEdges.length === 0) {
    edges = props.network.network.elements
      .filter(elem => {
        return elem.data.id[0] === 'e'
      })
      .map(elem => {
        return elem.data
      })
  } else {
    edges = props.network.selectedEdges
  }

  const nodes = props.nodeList
  

  const entityProperties = [
    'Source',
    'Target',
    'Type',
    'SBO Type',
    'Interaction',
    'Mechanism',
    'Throughput',
    'Location',
    'Score',
    'Citation',
    'Sentence',
    'Publication 1st Author',
    'Annotator',
    'Interaction Detection Methods',
    'Presence In Other Species',
    'Source Databases',
    'Experimental System',
    'Experimental System Type',
    'Modification',
    'Phenotypes',
    'Qualifications'
  ]

  const edgeProperties = [
    'Start Arrow',
    'End Arrow',
    'Connector Type',
    'Line Thickness',
    'Line Style',
    'Color',
    'Directed',
    'Edge Id'
  ]

  const displayItems = [entityProperties, edgeProperties]

  edges.sort((a, b) => {
    let aScore = 0
    let bScore = 0
    const aSource = findNode(a.source, nodes)
    const aTarget = findNode(a.target, nodes)
    const bSource = findNode(b.source, nodes)
    const bTarget = findNode(b.target, nodes)
    if (aSource !== '') {
      aScore++
    }
    if (aTarget !== '') {
      aScore++
    }
    if (bSource !== '') {
      bScore++
    }
    if (bTarget !== '') {
      bScore++
    }
    if (bScore - aScore !== 0) {
      return bScore - aScore
    } else if (aSource === '') {
      return 1
    } else if (bSource === '') {
      return -1
    }

    if (aSource.toUpperCase() > bSource.toUpperCase()) {
      return 1
    } else if (aSource.toUpperCase() < bSource.toUpperCase()) {
      return -1
    } else if (aTarget.toUpperCase() > bTarget.toUpperCase()) {
      return 1
    } else {
      return -1
    }
  })

  const topDisplay = []
  edges.forEach(edge => {
    const attributes = []
    const originalId = edge.id.slice(1)
    let content
    let title
    let source
    let target

    //Set up dictionary for complete property lists
    const completeListProperties = {}
    for (const property in listProperties) {
      const listForAllEdges = listProperties[property]
      const listForThisEdge = listForAllEdges[originalId]
      completeListProperties[property] = new Set(listForThisEdge)
    }

    //Filter properties
    for (const key in edge) {
      content = extractContent(edge[key])
      title = extractTitle(key)
      if (
        !title.startsWith('__') &&
        content != null &&
        content !== 'null' &&
        content !== ''
      ) {
        if (title in completeListProperties) {
          completeListProperties[title].add(content)
        } else if (title === 'source') {
          source = findNode(content, nodes)
          attributes.push({
            title: 'Source',
            content: source,
            displayed: false
          })
        } else if (title === 'target') {
          target = findNode(content, nodes)
          attributes.push({
            title: 'Target',
            content: target,
            displayed: false
          })
        } else if (title === 'id') {
          attributes.push({
            title: 'Edge Id',
            content: originalId,
            displayed: false
          })
        } else if (title === 'sboType') {
          const id = content.split(':')[1]
          attributes.push({
            title: 'SBO Type',
            content:
              '<a href="' +
              'https://identifiers.org/SBO:' +
              id +
              '">' +
              content +
              '</a>'
          })
        } else {
          const [prefix, id] = content.split(':')
          if (
            prefix.toUpperCase() in context &&
            id != null &&
            /[^\s]/.test(id)
          ) {
            attributes.push({
              title: camelCaseToTitleCase(title),
              content:
                '<a href="' +
                context[prefix.toUpperCase()] +
                id +
                '">' +
                content +
                '</a>',
              displayed: false
            })
          } else {
            attributes.push({
              title: camelCaseToTitleCase(title),
              content: content,
              displayed: false
            })
          }
        }
      }
    }

    //Handle list attributes
    for (const propertyName in completeListProperties) {
      const propertyList = completeListProperties[propertyName]
      let propertyString = ''
      propertyList.forEach(property => {
        const [prefix, id] = property.split(':')
        if (prefix.toUpperCase() in context && id != null && /[^\s]/.test(id)) {
          propertyString +=
            '<a href="' +
            context[prefix.toUpperCase()] +
            id +
            '">' +
            property +
            '</a><br/>'
        } else {
          propertyString += property + '<br/>'
        }
      })
      if (propertyList.size > 1) {
        attributes.push({
          title: camelCaseToTitleCase(propertyName),
          content:
            '<div style="padding-left:1em;">' + propertyString + '</div>',
          displayed: false,
          noBreak: true
        })
      } else if (propertyList.size === 1) {
        attributes.push({
          title: camelCaseToTitleCase(propertyName),
          content: propertyString,
          displayed: false
        })
      }
    }

    const displayCol1 = []
    const displayCol2 = []
    let primaryString
    let secondaryString
    displayItems.forEach(list => {
      primaryString = ''
      let currentEntry
      list.forEach(element => {
        currentEntry = attributes.filter(entry => {
          return entry.title === element
        })[0]
        if (currentEntry != null && currentEntry.content != null) {
          primaryString +=
            currentEntry.title +
            ': ' +
            currentEntry.content +
            (currentEntry.noBreak ? '' : '<br>')
          currentEntry.displayed = true
        }
      })
      primaryString = formatPrimary(primaryString)
      if (primaryString !== '') {
        switch (list) {
          case entityProperties:
            secondaryString = 'Entity Properties'
            displayCol1.push(
              <ListItem key={Math.random()} className={classes.noPadding}>
                <ListItemText
                  inset={false}
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="caption"
                        color="textSecondary"
                      >
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography component="span" variant="caption">
                          {primaryString}
                        </Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
            break
          case edgeProperties:
            secondaryString = 'Edge Properties'
            displayCol2.push(
              <ListItem
                key={Math.random()}
                className={classes.listPadding}
                disableGutters={true}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography variant="caption">{primaryString}</Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
            break
        }
      }
    })

    primaryString = ''
    attributes.forEach(entry => {
      if (!entry.displayed) {
        primaryString +=
          entry.title + ': ' + entry.content + (entry.noBreak ? '' : '<br/>')
        entry.displayed = true
      }
    })
    primaryString = formatPrimary(primaryString)
    secondaryString = 'Additional properties'

    if (primaryString !== '') {
      displayCol1.push(
        <ListItem key={index++} className={classes.noPadding}>
          <ListItemText
            inset={false}
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="caption"
                  color="textSecondary"
                >
                  {secondaryString}
                </Typography>
                <div>
                  <Typography component="span" variant="caption">
                    {primaryString}
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    }

    //Create summary
    const summary = (
      <table>
        <tbody>
          <tr>
            <td>
              <Typography 
                variant="body2" 
                color={props.search.queryList.includes(source?.toUpperCase()) ? 'secondary' : 'initial'}
              >
                  {source}
              </Typography>
            </td>
            <td>
              <Typography variant="body2">{' ➝ '}</Typography>
            </td>
            <td>
              <Typography 
                variant="body2"
                color={props.search.queryList.includes(target?.toUpperCase()) ? 'secondary' : 'initial'}
              >
                {target}
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    )
    const details = (
      <table className={classes.table}>
        <tbody>
          <tr>
            <td valign={'top'}>{displayCol1}</td>
            <td valign={'top'}>{displayCol2}</td>
          </tr>
        </tbody>
      </table>
    )
    topDisplay.push(
      <ExpandPanel
        summary={summary}
        details={details}
        defaultExpanded={defaultExpanded}
        key={index++}
        divider={true}
      />
    )
  })

  //Don't return nothing
  if (topDisplay.length === 0) {
    return (
      <div className={'outer-rectangle'}>
        <div className={classes.center}>
          <Typography variant="body2" color="textSecondary">
            No edges to display
          </Typography>
        </div>
      </div>
    )
  } else if (topDisplay.length === 1) {
    if (!defaultExpanded) {
      setDefaultExpanded(true)
    }
    return (
      <div className={'outer-rectangle'}>
        <div className={'inner-rectangle'}>
          <List className={classes.noPadding}>{topDisplay}</List>
        </div>
      </div>
    )
  } else {
    if (defaultExpanded) {
      setDefaultExpanded(false)
    }
    return (
      <div className={'outer-rectangle'}>
        <div className={'inner-rectangle'}>
          <div>
            <List className={classes.noPadding}>{topDisplay}</List>
          </div>
        </div>
      </div>
    )
  }
}

const extractContent = entry => {
  if (entry == null) {
    return ''
  }
  return stripScripts(entry)
}

const extractTitle = entry => {
  if (entry == null) {
    return ''
  }
  return stripScripts(entry)
}

const formatPrimary = entry => {
  if (entry === '') {
    return entry
  }
  let modifiedText = entry
    .replace(/<\/?p\/?>/gi, '<br>')
    .replace(/(<\/?br\/?>)+/gi, '<br>')
    .replace(/(\n)+/gi, '\n')
    .replace(/<a\s+href=/gi, '<a class="table-property-link" target="_blank" href=')
    .trim()
  if (modifiedText.startsWith('<br>')) {
    modifiedText = modifiedText.slice(4, modifiedText.length - 1)
  }
  if (modifiedText.endsWith('<br>')) {
    modifiedText = modifiedText.slice(0, modifiedText.length - 4)
  }
  modifiedText = parse(camelCaseToTitleCase(modifiedText))
  return <Linkify options={{className: "table-property-link"}} key={'link:' + index++}>{modifiedText}</Linkify>
}

const findNode = (nodeId, nodeArray) => {
  if (isNaN(nodeId) || nodeId === '') {
    return nodeId
  }
  const returnNode = nodeArray.filter(
    item => item['@id'].toString() === nodeId.toString()
  )[0]

  if (returnNode != null) {
    return returnNode.n
  } else {
    return ''
  }
}

//Necessary because otherwise open list items will collapse every time "SET_AVAILABLE" happens
const MemoEdgeProperties = React.memo(EdgeProperties, (prevProps, newProps) => {
  return isEqual(
    prevProps.network.selectedEdges,
    newProps.network.selectedEdges
  )
})

export default MemoEdgeProperties
