import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import GeneAnnotationList from './GeneAnnotationList'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto'
  },
  list: {
    height: '100%',
    width: '100%'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  }
}))

const NodeProperties = props => {
  const { node } = props
  const keys = Object.keys(node)

  return (
    <React.Fragment>
      <GeneAnnotationList geneSymbol={node.name} {...props} />

      {keys.map(key => (
        <ListItem key={key}>
          <ListItemText inset primary={node[key]} secondary={key} />
        </ListItem>
      ))}
    </React.Fragment>
  )
}

export default NodeProperties
