import React from 'react'
import Split from 'react-split'
import {isEqual} from 'lodash'

import { makeStyles, withStyles } from '@material-ui/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { camelCaseToTitleCase } from './camel-case-util'
import { stripScripts }  from './strip-scripts-util'
import { findAttributes } from './attribute-util'

import Linkify from 'linkifyjs/react'
import parse from 'html-react-parser'


let index = 0

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto',
    height: '100%',
    boxSizing: 'content-box'
  },
  padding: {
    paddingLeft: '16px',
    paddingTop: '12px'
  },
  lessPadding: {
    paddingTop: '2.49px'
  }
}))

//Expansion panel styling
const ExpansionPanel = withStyles({
  root: {
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: '10px',
    height: '26px',
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
    },
  },
  content: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: '-9px',
    marginRight: 0,
    '&$expanded': {
      marginTop: 0,
      marginBottom: 0,
      marginLeft: '-9px',
      marginRight: 0,
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const NetworkProperties = props => {
  index = 0
  const originalCX = props.network.originalCX
  const classes = useStyles()

  //Find network props
  let networkAttr = findAttributes(originalCX, 'networkAttributes')
  if (networkAttr === null) {
    return
  }

  //What to display
  const leftDisplayItems = [
    'Name',
    'Description',
    'Reference',
    '@context'
  ]
  const properties = [
    'Organism',
    'Cell',
    'Disease'
  ]
  const contributors = [
    'Author',
    'Reviewers',
    'Rights Holder',
    'Rights',
  ]
  const wikiPathways = [
    'WikiPathways ID',
    'WikiPathways Version',
    'WikiPathways IRI'
  ]
  const networkInformation = [
    'Version',
    'Network Type',
    'Labels'
  ]
  const rightDisplayItems = [
    properties,
    contributors,
    wikiPathways,
    networkInformation
  ]
  

  //Filter properties
  const attributes = []
  let content;
  let title;
  networkAttr.forEach(element => {
    content = extractContent(element)
    title = extractTitle(element)
    if (!title.startsWith('__') && content != null && content !== '') {
      attributes.push({
        title: camelCaseToTitleCase(title),
        content: content,
        displayed: false
      })
    } else if (title === 'name') {
      attributes.push({
        title: 'Name',
        content: 'Untitled',
        displayed: false
      })
    }
  })

  //Right side of display
  const rightDisplay = []
  rightDisplayItems.forEach(list => {
    let primaryString = ''
    let currentEntry
    list.forEach(element => {
      currentEntry = attributes.filter(entry => {
        return entry.title === element
      })[0]
      if (currentEntry != null){
        primaryString += 
          currentEntry.title + 
          ": " + 
          currentEntry.content + 
          "<br>"
        currentEntry.displayed = true
      }
    })
    let secondaryString
    switch(list) {
      case properties:
        secondaryString = 'Properties'
        break
      case contributors:
        secondaryString = 'Contributors'
        break
      case wikiPathways:
        secondaryString = 'WikiPathways'
        break
      case networkInformation:
        secondaryString = 'Network Information'
        break
      }
    primaryString = formatPrimary(primaryString)
    if (primaryString != '') {
      rightDisplay.push(
        <ListItem key={index++}>
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
    }
  })

  //Left side of display
  const leftDisplay = []
  let currentEntry
  let primaryString
  let secondaryString
  leftDisplayItems.forEach(element => {
    currentEntry = attributes.filter(entry => {
      return entry.title === element
    })[0]
    if (currentEntry != null) {
      if (element === '@context') {
        primaryString = formatContext(currentEntry.content)
        currentEntry.displayed = true
        leftDisplay.push(
          <React.Fragment>
            <div className={classes.padding}>
            <Typography component="span" variant="caption" color="textSecondary">
              @context
            </Typography>
            </div>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon/>}
              >
                <Typography component="span" variant="body2">
                  Click to view the namespaces associated with this network
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography variant="body2">
                  {primaryString}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            </React.Fragment>
        )
      } else {
        primaryString = formatPrimary(currentEntry.content)
        secondaryString = element
        currentEntry.displayed = true
        leftDisplay.push(
          <ListItem key={index++}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography component="span" variant="caption" color="textSecondary">
                    {secondaryString}
                  </Typography>
                  <div>
                    <Typography component="span" variant="body2">
                      {primaryString}
                    </Typography>
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
        )
      }
    }
  })
  attributes.forEach(entry => {
    if (!entry.displayed) {
      primaryString = formatPrimary(entry.content)
      secondaryString = entry.title
      entry.displayed = true
      leftDisplay.push(
        <ListItem key={index++}>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography component="span" variant="caption" color="textSecondary">
                  {secondaryString}
                </Typography>
                <div>
                  <Typography component="span" variant="body2">
                    {primaryString}
                  </Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    }
  })

  //Display panes
  return (
    <Split sizes={[70, 30]} gutterSize={7} className="network-info">
      <div className={'network-info-panel'}>
        <List className={classes.lessPadding}>
          {leftDisplay}
        </List>
      </div>
      <div className={'network-info-panel'}>
        <List className={classes.lessPadding}>
          {rightDisplay}
        </List>
      </div>
    </Split>
  )
}

const extractContent = entry => {
  let modifiedText = entry.v
  if (Array.isArray(entry.v)) {
    modifiedText = entry.v.join(', ')
  }
  return stripScripts(modifiedText.trim())
}

const extractTitle = entry => {
  let modifiedText
  if (entry.n != null) {
    modifiedText = entry.n.charAt(0).toUpperCase() + entry.n.slice(1)
  } else {
    modifiedText = ''
  }
  return stripScripts(modifiedText.trim())
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
  modifiedText = parse(modifiedText)
  return <Linkify key={'link' + index++} newTab={true}>{modifiedText}</Linkify>
}

const formatContext = entry => {
  const elements = entry.split(',')
  let splitResults
  let result = '<table><tbody>'
  elements.forEach(item => {
    splitResults = item.split("\"")
    result += 
      '<tr><td>' +
      splitResults[1] +
      '</td><td>' +
      splitResults [3] +
      '</td></tr>'    
  })
  result += '</tbody></table>'
  return formatPrimary(result)
}

const MemoNetworkProperties = React.memo(NetworkProperties, (prevProps, newProps) => {
  return true
})

export default (MemoNetworkProperties)