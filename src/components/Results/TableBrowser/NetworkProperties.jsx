import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const LIST_DATA_PREFIX = 'list_of'

const PRESET_ATTR_NAMES = ['name', 'description']

const NetworkProperties = props => {
  const { originalCX } = props

  // Find network props
  let len = originalCX.length
  let networkAttr = null

  while (len--) {
    const entry = originalCX[len]
    if (entry.networkAttributes) {
      networkAttr = entry.networkAttributes
      break
    }
  }

  if (networkAttr === null) {
    return
  }
  return (
    <React.Fragment>
      {networkAttr.map(entry => (
        <ListItem key={Math.random()}>
          <ListItemText
            inset
            primary={removeHtmlTags(entry)}
            secondary={entry.n}
          />
        </ListItem>
      ))}
    </React.Fragment>
  )
}

const removeHtmlTags = entry => {
  let dataType = entry.d

  if (dataType === undefined) {
    dataType = 'string'
  }

  if (dataType.startsWith(LIST_DATA_PREFIX)) {
    return '(list not supported)'
  }

  const originalText = entry.v
  if (originalText === null || originalText === undefined) {
    return ''
  } else {
    return originalText.replace(/<(?:.|\n)*?>/gm, ' ')
  }
}

export default NetworkProperties
