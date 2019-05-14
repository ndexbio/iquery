import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

const handleClick = (geneSymbol, props) => {
  props.searchActions.setSelectedGenes([geneSymbol])
}

const handleClear = (event) => {
  console.log('Clear selection', event.target.value)
}

const GeneList = props => {
  const { classes, search, network } = props

  const results = search.results
  const hits = network.hitGenes

  if (!results) {
    return <div className="gene-list-wrapper" />
  }

  const geneList = results.genes
  if (!geneList) {
    return <div className="gene-list-wrapper" />
  }

  const values = []
  for (let value of geneList.values()) {
    values.push(value)
  }

  return (
    <div className="gene-list-wrapper" onClick={event => handleClear(event)}>
      {values.map(value => getChip(value, true, classes, props, hits))}
    </div>
  )
}

const getChip = (value, isValid, classes, props, hits) => {

  const hitSets = new Set(hits)

  let color = 'default'
  if(hitSets.has(value.symbol)) {
    color = 'secondary'
  }

  if (isValid) {
    return (
      <Chip
        className={classes.chip}
        avatar={<Avatar>G</Avatar>}
        label={value.symbol}
        onClick={() => handleClick(value.symbol, props)}
        variant="outlined"
        color={color}
        key={value.symbol}
      />
    )
  } else {
    return (
      <Chip
        avatar={<Avatar>G</Avatar>}
        label={'INVALID: ' + value}
        onClick={handleClick}
        key={value}
      />
    )
  }
}

GeneList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GeneList)
