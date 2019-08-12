import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import GeneAnnotationList from './GeneAnnotationList'
import { getListNodeAttr } from './attribute-util'
import { camelCaseToTitleCase } from './camel-case-util.js'


const NodeProperties = props => {
  const { node, originalCX } = props
  const listAttr = getListNodeAttr(originalCX, node.id)

  const keys = Object.keys(node)

  

  keys.forEach(key => {
    if (listAttr[key] !== undefined) {
      node[key] = listAttr[key].join(', ')
    }
  })

  const potentialDisplayKeys = ["Type", 'HGNC', 'Ensembl']
  const displayKeys = []
  potentialDisplayKeys.forEach(key => {
    if (node[key] != null && node[key] != "") {
      displayKeys.push(key)
    }
  })

  return (
    <React.Fragment>
      <GeneAnnotationList geneSymbol={node.name} {...props} />

      {displayKeys.map(key => (
        <ListItem key={key}>
          <ListItemText inset primary={camelCaseToTitleCase(node[key])} secondary={key} />
        </ListItem>
      ))}
    </React.Fragment>
  )
}

export default NodeProperties
