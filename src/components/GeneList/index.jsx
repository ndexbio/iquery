import React from 'react'
import { withStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MuiToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Typography } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'

const buttonStyle = {
  height: '24px',
  borderWidth: '0',
}

const selectedButtonStyle = {
  height: '24px',
  borderWidth: '0',
}

const toggleButtonGroupStyle = {
  backgroundColor: 'transparent',
}

const ToggleButton = withStyles({
  label: {
    backgroundColor: 'transparent',
  },
})(MuiToggleButton)

export const NormalizedGeneTypography = withStyles({
  root: {
    color: "#fc9b6f",
    textDecoration: 'underline'
  }
})(Typography);

export const InvalidGeneTypography = withStyles({
  root: {
    textDecoration: 'line-through',
    textDecorationColor: 'red'
  }
})(Typography);


const GeneList = props => {
  const results = props.search.searchResults
  const hits = props.network.hitGenes
  const hitSets = new Set(hits)

  // when a user clicks on a query gene, we need to find it in the network
  // sometimes genes are under aliases or different names, so we need to look
  // up the gene in a node map
  const handleChange = (event, newAlignment) => {
    event.stopPropagation();
    if (newAlignment in props.geneToNodeMap) {
      const alignment = props.geneToNodeMap[newAlignment]
      if (alignment === props.search.selectedGenes[0]) {
        props.searchActions.clearSelectedGenes()
      } else {
        props.searchActions.setSelectedGenes(alignment)
      }
    } else {
      if (newAlignment === props.search.selectedGenes[0]) {
        props.searchActions.clearSelectedGenes()
      } else {
        props.searchActions.setSelectedGenes(newAlignment)
      }
    }
  }

  if (!results) {
    return <div className="gene-list-wrapper" />
  }


  const queryGeneList = results.query
  const { queryGenes, invalid, normalizedGenes } = results.validatedGenes

  if (!queryGeneList) {
    return <div className="gene-list-wrapper" />
  }

  const matched = []
  const unmatched = []

  const unique = new Set([...queryGenes, ...invalid])
  for (const gene of queryGeneList) {
    unique.add(gene)
  }

  for (const value of unique) {
    if (hitSets.has(value.toUpperCase())) {
      matched.push(value.toUpperCase())
    } else {
      unmatched.push(value.toUpperCase())
    }
  }

  const createGeneInfo = gene => {
    const isValid = queryGenes.includes(gene)
    const isNormalized = normalizedGenes[gene] != null;

    return {
      gene,
      isValid,
      alias: isNormalized ? normalizedGenes[gene] : null
    }
  };

  const matchedSorted = matched.sort()
  const unmatchedSorted = unmatched.sort()
  const sorted = [...matchedSorted, ...unmatchedSorted].map(createGeneInfo);

  const validGeneText = ({gene, alias}) => {
    return <Typography variant="body2" 
    color={hitSets.has(gene.toUpperCase()) ? "secondary" : "default"}
    >
      {gene}
    </Typography>  
  }

  const normalizedGeneText = ({gene, alias}) => {
   return <Tooltip title={`This query gene was normalized. Original query term: ${alias}`}>
    <NormalizedGeneTypography variant="body2" style={{overflow: 'hidden'}}>
      {gene}
    </NormalizedGeneTypography>
  </Tooltip>
  }

  const invalidGeneText = ({gene, alias}) => {
    return <Tooltip title={`Not a valid human gene: ${gene}`}>
     <InvalidGeneTypography variant="body2">
       {gene}
     </InvalidGeneTypography>
   </Tooltip>
   }
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', maxHeight: '500px', overflowX: 'hidden', overflowY: 'scroll'}}>
        {sorted.map(({gene, isValid, alias}) => {
          const isNormalized = alias != null
          return (<div key={gene} style={{ minWidth: 0, width: '90px', paddingTop: 0, paddingBottom: 0, paddingRight: 0}}>
            <ToggleButtonGroup
              value={props.search.selectedGenes}
              exclusive
              onChange={handleChange}
              style={toggleButtonGroupStyle}
            >
              <ToggleButton
                value={gene}
                style={
                  {...(hitSets.has(gene) && props.search.selectedGenes[0] === gene
                    ? selectedButtonStyle
                    : buttonStyle),
                    cursor: hitSets.has(gene.toUpperCase()) ? 'pointer' : 'default'}
                }
              >
                { !isValid ? invalidGeneText({gene, alias}) : isNormalized ?  normalizedGeneText({gene, alias}) : validGeneText({gene, alias})  }
              </ToggleButton>
            </ToggleButtonGroup>
          </div>)
        })}
    </div>
  )
}

export default GeneList
