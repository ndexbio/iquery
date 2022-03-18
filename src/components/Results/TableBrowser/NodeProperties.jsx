import React, { useState } from 'react'
import Linkify from 'linkify-react'
import parse from 'html-react-parser'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { camelCaseToTitleCase } from './camel-case-util.js'
import { stripScripts } from './strip-scripts-util.js'
import GeneAnnotationList from './GeneAnnotationList'
import ExpandPanel from './ExpandPanel'
import { isEqual } from 'lodash'


import { MAX_NETWORK_SIZE } from '../../../api/config'

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
    marginLeft: '0.5em',
    backgroundColor: '#C51162',
    height: '1em',
    width: '1em'
  },
  icon: {
    height: '0.5em',
    weidth: '0.5em'
  }
}))

let index = 0

const NodeProperties = props => {
  const classes = useStyles()

  const context = props.context
  const listProperties = props.listProperties

  const [defaultExpanded, setDefaultExpanded] = useState(true)


  //Display all nodes if no nodes are selected
  let nodes
  
  if ((props.network.nodeCount + props.network.edgeCount) > MAX_NETWORK_SIZE){
    return (
      <div className={'outer-rectangle'}>
        <div className={classes.center}>
          <Typography color="textSecondary" variant="subtitle1">
            Network to big to display nodes
          </Typography>
        </div>
      </div>
    ) 
  }
  
  if (props.network.selectedNodes.length === 0) {
    nodes = props.network.network.elements
      .filter(elem => {
        return elem.data.id[0] !== 'e'
      })
      .map(node => {
        return node.data
      })
      .filter(nodeData => {
        return nodeData.name != null && nodeData.name !== ''
      })
  } else {
    nodes = props.network.selectedNodes
  }

  const entityProperties = [
    'Name',
    'Type',
    'Location',
    'ID',
    'HGNC',
    'Ensembl',
    'Alias',
    'Members',
    'Member'
  ]

  const nodeProperties = [
    'Height',
    'Width',
    'Shape',
    'Is GPML Shape',
    'Color',
    'Fill Color',
    'Transparent',
    'Border Thickness',
    'Border Style',
    'Label Size',
    'Label Font',
    'Node Id',
    'Query Node'
  ]

  const displayItems = [entityProperties, nodeProperties]

  nodes.sort((a, b) => {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1
    } else {
      return -1
    }
  })

  const topDisplay = []
  nodes.forEach(node => {
    const attributes = []
    let content
    let title
    let geneAnnotation = null
    let inset = false
    let querynode = false

    //Set up dictionary for complete property lists
    const completeListProperties = {}
    for (const property in listProperties) {
      const listForAllNodes = listProperties[property]
      const listForThisNode = listForAllNodes[node.name]
      completeListProperties[property] = new Set(listForThisNode)
    }

    //Add represents
    if (node.name in props.represents) {
      const [prefix, id] = props.represents[node.name].split(':')
      if (id != null && /[^\s]/.test(id)) {
        if (prefix.toUpperCase() in context) {
          attributes.push({
            title: 'ID',
            content:
              '<a href="' +
              context[prefix.toUpperCase()] +
              id +
              '">' +
              props.represents[node.name] +
              '</a>',
            displayed: false
          })
        } else {
          attributes.push({
            title: 'ID',
            content: props.represents[node.name],
            displayed: false
          })
        }
      } else {
        attributes.push({
          title: 'ID',
          content: props.represents[node.name],
          displayed: false
        })
      }
    }

    //Filter properties
    for (const key in node) {
      content = extractContent(node[key])
      title = extractTitle(key)
      if (title === 'querynode') {
        querynode = true
      }
      if (
        !title.startsWith('__') &&
        content != null &&
        content !== 'null' &&
        content !== ''
      ) {
        if (title in completeListProperties) {
          completeListProperties[title].add(content)
        } else if (title === 'id') {
          attributes.push({
            title: 'Node Id',
            content: content,
            displayed: false
          })
        } else if (title.toUpperCase() in context) {
          attributes.push({
            title: camelCaseToTitleCase(title),
            content:
              '<a href="' +
              context[title.toUpperCase()] +
              '/' +
              content +
              '">' +
              content +
              '</a>',
            displayed: false
          })
        } else if (title !== 'query') {
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
          } else if (prefix === 'hgnc.symbol') {
            attributes.push({
              title: camelCaseToTitleCase(title),
              content:
                '<a href="https://identifiers.org/hgnc/' +
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
            '">\t' +
            property +
            '</a><br/>'
        } else if (id != null && /[^\s]/.test(id)) {
          propertyString +=
            '<a href="https://identifiers.org/' +
            prefix +
            '/' +
            id +
            '">\t' +
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
          displayed: false
        })
      } else if (propertyList.size === 1) {
        attributes.push({
          title: camelCaseToTitleCase(propertyName),
          content: propertyString,
          displayed: false
        })
      }
    }

    //Add gene annotation
    if (
      props.search.results != null &&
      (props.search.results.genes.get(node.name) != null ||
        props.search.results.genes.get(node?.name?.toLowerCase()) != null)
    ) {
      inset = true
      geneAnnotation = (
        <List className={classes.noPadding}>
          <GeneAnnotationList
            {...props}
            search_results={props.search.results}
            geneSymbol={node.name}
          />
        </List>
      )
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
            currentEntry.title + ': ' + currentEntry.content + '<br>'
          currentEntry.displayed = true
        }
      })
      primaryString = formatPrimary(primaryString)
      if (primaryString !== '') {
        switch (list) {
          case entityProperties:
            secondaryString = 'Entity Properties'
            displayCol1.push(
              <ListItem
                key={index++}
                className={classes.noPadding}
                disableGutters={true}
              >
                <ListItemText
                  inset={inset}
                  primary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography variant="caption" component="div">
                          {primaryString}
                        </Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )
            break
          case nodeProperties:
            // secondaryString = 'Node Properties'
            // displayCol2.push(
            //   <ListItem
            //     key={index++}
            //     className={classes.noPadding}
            //     disableGutters={true}
            //   >
            //     <ListItemText
            //       primary={
            //         <React.Fragment>
            //           <Typography variant="caption" color="textSecondary">
            //             {secondaryString}
            //           </Typography>
            //           <div>
            //             <Typography variant="caption">{primaryString}</Typography>
            //           </div>
            //         </React.Fragment>
            //       }
            //     />
            //   </ListItem>
            // )
            break
        }
      }
    })

    primaryString = '';
    const filteredAttributes = ['Iquerypercentaltered']
    attributes.forEach(entry => {
      if(filteredAttributes.includes(entry.title)){
        const alterationPercentage = entry.content.split('::s')[1];
        primaryString += `Alteration Frequency: ${alterationPercentage}`;
      }
    })
    primaryString = formatPrimary(primaryString)
    secondaryString = 'Additional properties'

    if (primaryString !== '') {
      displayCol1.push(
        <ListItem
          key={index++}
          className={classes.noPadding}
          disableGutters={true}
        >
          <ListItemText
            inset={inset}
            primary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary">
                  {secondaryString}
                </Typography>
                <div>
                  <Typography variant="body2">{primaryString}</Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    }

    const summary = (
      <table>
        <tbody>
          <tr>
            <td>
              <Typography 
                variant="body2" 
                color={querynode ? 'secondary' : 'initial'}
              >
                {node.name}
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
            <td colSpan="2" valign="top">
              {geneAnnotation}
            </td>
          </tr>
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
        key={node.id + index++}
        divider={true}
      />
    )
  })

  //Don't return nothing
  if (topDisplay.length === 0) {
    return (
      <div className={'outer-rectangle'}>
        <div className={classes.center}>
          <Typography color="textSecondary" variant="subtitle1">
            No nodes to display
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
  modifiedText = parse(modifiedText)
  return <Linkify options={{className: 'table-property-link'}} key={'link' + index++}>{modifiedText}</Linkify>
}

//Necessary because otherwise open list items will collapse every time "SET_AVAILABLE" happens
const MemoNodeProperties = React.memo(NodeProperties, (oldProps, newProps) => {
  return isEqual(oldProps.network.selectedNodes, newProps.network.selectedNodes)
})

export default MemoNodeProperties
