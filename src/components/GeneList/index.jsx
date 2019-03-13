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
  const { classes } = props

  const results = props.search.results

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
      {values.map(value => getChip(value, true, classes, props))}
    </div>
  )
}

const getChip = (value, isValid, classes, props) => {
  if (isValid) {
    return (
      <Chip
        className={classes.chip}
        avatar={<Avatar>G</Avatar>}
        label={value.symbol}
        onClick={() => handleClick(value.symbol, props)}
        variant="outlined"
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
