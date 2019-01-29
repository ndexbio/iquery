import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './style.css'

const SearchPanel = props => {
  const handleSet = event => {
    const textData = event.target.value
    console.log('EVT = ', event.target.value)
    props.searchActions.setQuery(textData)
  }

  const handleClear = event => {
    props.searchActions.clearQuery('')
  }

  const handleSearch = event => {
    const genes = props.search.queryGenes
    props.searchActions.searchStarted(genes)
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
          className="search-button"
          variant="contained"
          onClick={handleClear}
        >
          Clear
        </Button>
        <Button
          className="search-button"
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </div>
  )
}

export default SearchPanel
