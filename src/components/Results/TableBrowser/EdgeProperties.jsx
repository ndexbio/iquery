import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const EdgeProperties = props => {
  const { edge } = props

  const keys = Object.keys(edge)

  return (
    <React.Fragment>
      {keys.map(key => (
        <ListItem key={key}>
          <ListItemText inset primary={edge[key]} secondary={key} />
        </ListItem>
      ))}
    </React.Fragment>
  )
}

export default EdgeProperties
