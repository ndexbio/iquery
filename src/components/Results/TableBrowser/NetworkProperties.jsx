import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { getListNetworkAttr, findAttributes } from './attribute-util'

const NetworkProperties = props => {
  const { originalCX } = props

  // Find network props
  let networkAttr = findAttributes(originalCX, 'networkAttributes')
  if (networkAttr === null) {
    return
  }

  return (
    <React.Fragment>
      {networkAttr.map(entry => (
        <ListItem key={Math.random()}>
          <ListItemText
            inset
            primary={formatValue(entry)}
            secondary={entry.n}
          />
        </ListItem>
      ))}
    </React.Fragment>
  )
}

const formatValue = entry => {
  let modifiedText = entry.v

  if(Array.isArray(entry.v)) {
    modifiedText = entry.v.join(', ')
  }
  return removeHtmlTags(modifiedText.toString())
}

const removeHtmlTags = text => {
  const originalText = text
  if (originalText === null || originalText === undefined) {
    return ''
  } else {
    return originalText.replace(/<(?:.|\n)*?>/gm, ' ')
  }
}

export default NetworkProperties
