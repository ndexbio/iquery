import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'

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


const GeneList = props => {
  const { classes } = props


  const results = props.search.results

  if (!results) {
    return <div className="gene-list-wrapper" />
  }

  const geneList = results.genes
  const notFound = results.notFound

  if (!geneList) {
    return <div className="gene-list-wrapper" />
  }

  const values = []
  for (let value of geneList.values()) {
    values.push(value)
  }

  return (
    <div className="gene-list-wrapper">
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
        color="primary"
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
