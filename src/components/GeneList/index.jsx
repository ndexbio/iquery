import React from 'react'
import { withStyles } from '@material-ui/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MuiToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { Typography } from '@material-ui/core'

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

const GeneList = props => {
  const results = props.search.searchResults
  const hits = props.network.hitGenes
  const hitSets = new Set(hits)

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

  if (!queryGeneList) {
    return <div className="gene-list-wrapper" />
  }

  const matched = []
  const unmatched = []

  const unique = new Set()
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

  const matchedSorted = matched.sort()
  const unmatchedSorted = unmatched.sort()
  const sorted = [...matchedSorted]

  return (
    <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', maxHeight: '500px', overflowX: 'hidden', overflowY: 'scroll'}}>
        {sorted.map(geneValue => (
          <div key={geneValue} style={{ minWidth: 0, width: '80px', paddingTop: 0, paddingBottom: 0, paddingRight: 0}}>
            <ToggleButtonGroup
              value={props.search.selectedGenes}
              exclusive
              onChange={handleChange}
              style={toggleButtonGroupStyle}
            >
              <ToggleButton
                disabled={!hitSets.has(geneValue.toUpperCase())}
                value={geneValue}
                style={
                  {...(hitSets.has(geneValue) && props.search.selectedGenes[0] === geneValue
                    ? selectedButtonStyle
                    : buttonStyle),
                    cursor: hitSets.has(geneValue.toUpperCase()) ? 'pointer' : 'default'}
                }
              >
                {
                  <Typography variant="body2" color={hitSets.has(geneValue.toUpperCase()) ? "secondary" : "default"}>
                    {geneValue}
                  </Typography>  
                }
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        ))}
    </div>
  )
}

export default GeneList
