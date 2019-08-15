import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { getListNetworkAttr, findAttributes } from './attribute-util'
import Linkify from 'linkifyjs/react'
import parse from 'html-react-parser'

const NetworkProperties = props => {
  const { originalCX } = props

  // Find network props
  let networkAttr = findAttributes(originalCX, 'networkAttributes')
  if (networkAttr === null) {
    return
  }

  //What to display
  const primaries = []
  const secondaries = []
  for (var i = 0; i < networkAttr.length; i++) {
    let prim = formatValue(networkAttr[i])
    let sec = formatName(networkAttr[i])

    //If property name starts with __
    if (sec.startsWith('__')) {
      continue
    }
    //If property value is null, undefined, empty string
    if (prim == null || prim === '') {
      //If missing property is name
      if (networkAttr[i].n === 'name') {
        prim = 'Untitled'
        sec = 'Name'
      } else {
        continue
      }
    }

    //Linkify and parse html
    prim = parse(prim)
    prim = <Linkify key={'link' + i}>{prim}</Linkify>

    primaries.push(prim)
    secondaries.push(sec)
  }

  //How to display it
  const order = [
    'Name',
    'Organism',
    'Cell',
    'Disease',
    'Description',
    'Version',
    'Author',
    'Reviewers',
    'NetworkType',
    'Labels',
    'RightsHolder',
    'WikipathwaysID',
    'WikipathwaysVersion',
    'WikipathwaysIRI',
    'Rights',
    '@context'
  ]

  const visited = []
  for (var i = 0; i < primaries.length; i++) {
    visited.push(false)
  }
  const sortedSec = []
  const sortedPrim = []
  for (let i = 0; i < order.length; i++) {
    let ind = secondaries.indexOf(order[i])
    if (ind >= 0) {
      sortedSec.push(secondaries[ind])
      sortedPrim.push(primaries[ind])
      visited[ind] = true
    }
  }
  for (let i = 0; i < primaries.length; i++) {
    if (!visited[i]) {
      sortedSec.push(secondaries[i])
      sortedPrim.push(primaries[i])
    }
  }

  const display = []
  for (let i = 0; i < sortedPrim.length; i++) {
    display.push(
      <ListItem key={i}>
        <ListItemText inset primary={sortedPrim[i]} secondary={sortedSec[i]} />
      </ListItem>
    )
  }

  return <React.Fragment>{display}</React.Fragment>
}

const formatValue = entry => {
  let modifiedText = entry.v
  if (Array.isArray(entry.v)) {
    modifiedText = entry.v.join(', ')
  }
  return modifiedText.trim()
}

const formatName = entry => {
  let modifiedText
  if (entry.n != null) {
    modifiedText = entry.n.charAt(0).toUpperCase() + entry.n.slice(1)
  } else {
    modifiedText = ''
  }
  return modifiedText
}

export default NetworkProperties
