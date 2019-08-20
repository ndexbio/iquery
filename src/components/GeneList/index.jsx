import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/styles'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import CheckIcon from '@material-ui/icons/Check'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const useStyles = makeStyles(theme => ({
  chip: {
    margin: '0'
  },
  listPadding: {
    paddingTop: '0',
    paddingBottom: '22'
  },

}))

const buttonStyle = {
  padding: '0',
  borderRadius: '20px',
  height: '32px',
  borderWidth: '0',
  color: '#FFFFFF',
  backgroundColor: '#FFFFFF'
}

const selectedButtonStyle = {
  padding: '0',
  borderRadius: '20px',
  height: '32px',
  borderWidth: '0',
  backgroundColor: 'rgb(252, 235, 242)',
  color: 'rgb(252, 235, 242)'
}

const selectedChipStyle = {
  margin: '0',
  backgroundColor: 'rgba(0, 0, 0, 0)'
}

const handleClick = (geneSymbol, props) => {
  console.log(geneSymbol)
}

const handleClear = (event, props) => {
  console.log('#### Clear selection', event.target.value)
  //props.searchActions.setSelectedGenes([])
}

const GeneList = props => {
  const { search, network } = props
  const classes = withStyles()

  const results = search.results
  const hits = network.hitGenes
  const hitSets = new Set(hits)

  const [alignment, setAlignment] = React.useState(0)

  const handleChange = (event, newAlignment) => {
    if (newAlignment == null) {
      setAlignment(0)
      props.searchActions.clearSelectedGenes()
    } else {
      setAlignment(newAlignment)
      props.searchActions.setSelectedGenes(newAlignment)
    }
  }

  if (!results) {
    return <div className="gene-list-wrapper" />
  }

  const geneList = results.genes
  if (!geneList) {
    return <div className="gene-list-wrapper" />
  }

  const matched = []
  const unmatched = []

  for (let value of geneList.values()) {
    if (hitSets.has(value.symbol)) {
      matched.push(value)
    } else {
      unmatched.push(value)
    }
  }

  const sortBySymbol = (a, b) => {
    if (a.symbol < b.symbol) {
      return -1
    }
    if (a.symbol > b.symbol) {
      return 1
    }
    return 0
  }

  const matchedSorted = matched.sort().reverse()
  const unmatchedSorted = unmatched.sort().reverse()
  const sorted = [...matchedSorted, ...unmatchedSorted]

  return (
    <div className="gene-list-wrapper" onClick={event => handleClear(event, props)}>
      <List>
        {sorted.map(geneValue => (
          <ListItem key={geneValue.symbol}>
            <ToggleButtonGroup 
              value={alignment} 
              exclusive 
              onChange={handleChange}>
              <ToggleButton value={geneValue.symbol}
                style={
                  hitSets.has(geneValue.symbol) && alignment == geneValue.symbol ?
                    selectedButtonStyle
                    : buttonStyle
                }
              >
                {getChip(geneValue, true, classes, props, hitSets)}
              </ToggleButton>
            </ToggleButtonGroup>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

const getChip = (value, isValid, classes, props, hitSets) => {
  let color = 'default'
  let found = false
  if (hitSets.has(value.symbol)) {
    color = 'secondary'
    found = true
  }

  if (isValid) {
    return (
      <Chip
        className={classes.chip}
        avatar={<Avatar>{found ? <CheckIcon /> : '-'}</Avatar>}
        label={value.symbol}
        onClick={() => handleClick(value.symbol, props)}
        variant="outlined"
        color={color}
        key={value.symbol}
        selected
        style={selectedChipStyle}
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

export default (GeneList)
