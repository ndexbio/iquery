import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './style.css'

import DeleteIcon from '@material-ui/icons/Delete'
import RefreshIcon from '@material-ui/icons/Refresh'
import SearchIcon from '@material-ui/icons/Search'
import SettingsIcon from '@material-ui/icons/Settings'

import { withStyles } from '@material-ui/core/styles'


const EXAMPLES = [
  'egfr cdk4 tp53',
  'per1 per2 clock',
  'mtor wnt1 igf1'
]



const styles = theme => ({
  button: {
    marginLeft: '0.5em'
  }
})

const SearchPanel = props => {
  const { classes } = props

  const handleSet = event => {
    const textData = event.target.value
    console.log('EVT = ', event.target.value)
    props.searchActions.setQuery(textData)
  }

  const handleClear = event => {
    props.searchActions.clearQuery()
  }

  const handleStartOver = event => {
    props.searchActions.clearAll()
  }

  const handleSearch = event => {
    const genes = props.search.queryGenes
    props.searchActions.searchStarted(genes)
  }

  const handleExample = exampleIdx => {
    console.log('Example:', exampleIdx)
    props.searchActions.setQuery(EXAMPLES[exampleIdx])
  }


  return (
    <div className="search">
      <TextField
        id="gene-list"
        label="Enter gene list (e.g. TP53)"
        multiline
        rows="15"
        fullWidth
        margin="normal"
        variant="outlined"
        value={props.search.queryGenes}
        onChange={handleSet}
      />

      <div className="buttons">
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClear}
        >
          <DeleteIcon />
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={event => handleExample(0)}
        >
          Ex 1
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={event => handleExample(1)}
        >
          Ex 2
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          onClick={event => handleExample(2)}
        >
          Ex 3
        </Button>
      </div>

      <div className="buttons">
        <Button
          className={classes.button}
          variant="contained"
          size="large"
        >
          <SettingsIcon />

        </Button>
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="secondary"
          onClick={handleStartOver}
        >
          <RefreshIcon />
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSearch}
        >
          <SearchIcon />
        </Button>
      </div>
    </div>
  )
}

export default withStyles(styles)(SearchPanel)
