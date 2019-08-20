import React, { useState } from 'react'
import Linkify from 'linkifyjs/react'
import parse from 'html-react-parser'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/styles'

import { camelCaseToTitleCase } from './camel-case-util.js'
import { stripScripts } from './strip-scripts-util.js'

let index = 0

const useStyles = makeStyles(theme => ({
  padding: {
    paddingTop: '0',
    paddingBottom: '0',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%'
  },
  wideList: {
    width: '100%',
    padding: '0 0 0 0'
  },
  listPadding: {
    paddingTop: '0',
    paddingBottom: '16px'
  },
  table: {
    width: '100%',
    tableLayout: 'fixed'
  }
}))

const ExpansionPanel = withStyles({
  root: {
    borderBottom: '1px solid rgba(239, 239, 239, 1)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    paddingLeft: '16px',
    paddingRight: '16px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: -1,
    minHeight: 35,
    '&$expanded': {
      minHeight: 35,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const EdgeProperties = props => {
  const classes = useStyles()
  const { edges, originalCX } = props
  const [defaultExpanded, setDefaultExpanded] = useState(true)
  let nodes
  for (let i = 0; i < originalCX.length; i++) {
    if (originalCX[i].nodes != null) {
      nodes = originalCX[i].nodes
      break
    }
  }

  const entityProperties = [
    'Source',
    'Target',
    'Type',
    'SBO Type',
    'Interaction',
    'Throughput',
    'Location'
  ]

  const edgeProperties = [
    'Start Arrow',
    'End Arrow',
    'Connector Type',
    'Line Thickness',
    'Line Style',
    'Color',
    'Id'
  ]

  const displayItems = [
    entityProperties,
    edgeProperties
  ]

  let source = ''
  let target = ''

  const topDisplay = []
  edges.forEach(edge => {
    //Filter properties
    const attributes = []
    let content;
    let title;
    for (let key in edge) {
      content = extractContent(edge[key])
      title = extractTitle(key)
      if (
        !title.startsWith('__') &&
        content != null &&
        content !== 'null' &&
        content !== '') {
        if (title === 'source') {
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
        } else {
          attributes.push({
            title: camelCaseToTitleCase(title),
            content: content,
            displayed: false
          })
        }
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
            ": " +
            currentEntry.content +
            "<br>"
          currentEntry.displayed = true
        }
      })
      primaryString = formatPrimary(primaryString)
      if (primaryString != '') {
        switch(list) {
          case entityProperties:
            secondaryString = 'Entity Properties'
            displayCol1.push(
              <ListItem 
                key={index++} 
                className={classes.listPadding}
              >
                <ListItemText
                  inset={false}
                  primary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography variant="body2">
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
                key={index++} 
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
                        <Typography variant="body2">
                          {primaryString}
                        </Typography>
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
          entry.title +
          ": " +
          entry.content +
          "<br>"
        entry.displayed = true
      }
    })
    primaryString = formatPrimary(primaryString)
    secondaryString = "Additional properties"

    if (primaryString != '') {
      displayCol1.push(
        <ListItem 
          key={index++} c
          lassName={classes.listPadding}
        >
          <ListItemText
            inset={false}
            primary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary">
                  {secondaryString}
                </Typography>
                <div>
                  <Typography variant="body2">
                    {primaryString}
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    }

    topDisplay.push(
      <ListItem 
        key={edge.id} 
        disableGutters={true} 
        className={classes.padding}
      >
        <ListItemText
          className={classes.wideList}
          primary={
            <ExpansionPanel
              defaultExpanded={defaultExpanded}
              setDefaultExpanded={setDefaultExpanded}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
              >
                <Typography variant="body2">
                  {source + " -> " + target}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                className={classes.noPadding}
              >
                <table className={classes.table}>
                  <tr>
                    <td valign={'top'}>
                      {displayCol1}
                    </td>
                    <td valign={'top'}>
                      {displayCol2}
                    </td>
                  </tr>
                </table>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          }
        />
      </ListItem>
    )
  })

  //Don't return nothing
  if (topDisplay.length == 0) {
    return (
      <div className={"outer-rectangle"}>
        <div className={classes.center}>
          <Typography variant="subtitle1" color="textSecondary">
            Select an edge to view edge properties
          </Typography>
        </div>
      </div>
    )
  } else if (topDisplay.length == 1) {
    if (!defaultExpanded) {
      setDefaultExpanded(true)
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={'inner-rectangle'}>
          <List className={classes.padding}>
            {topDisplay}
          </List>
        </div>
      </div>
    )
  } else {
    if (defaultExpanded) {
      setDefaultExpanded(false)
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={'inner-rectangle'}>
          <div>
            <List className={classes.padding}>
              {topDisplay}
            </List>
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
    .replace(/<a\s+href=/gi, '<a target="_blank" href=')
    .trim()
  if (modifiedText.startsWith('<br>')) {
    modifiedText = modifiedText.slice(4, modifiedText.length - 1)
  }
  if (modifiedText.endsWith('<br>')) {
    modifiedText = modifiedText.slice(0, modifiedText.length - 4)
  }
  modifiedText = parse(camelCaseToTitleCase(modifiedText))
  return <Linkify key={'link' + index++} newTab={true}>{modifiedText}</Linkify>
}

const findNode = (nodeId, nodeArray) => {
  return nodeArray.filter(item => {
    return item['@id'].toString() === nodeId
  })[0].n
}

export default EdgeProperties
