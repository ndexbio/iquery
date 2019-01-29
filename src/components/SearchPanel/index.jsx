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
      <Grid container alignItems={'center'} justify={'center'} spacing={16}>
        <Grid item xs={4}>
          <TextField
            id="outlined-multiline-flexible"
            label="e.g. TP53"
            multiline
            rows="15"
            value={props.search.queryGenes}
            onChange={handleSet}
            margin="normal"
            helperText="Gene List"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={4}>
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchPanel
