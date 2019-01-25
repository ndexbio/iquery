import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './style.css'

const SearchPanel = props => (
  <Grid item className="search">
    <Grid item>
      <TextField
        id="outlined-multiline-flexible"
        label="e.g. TP53"
        multiline
        rowsMax="10"
        value={props.query}
        margin="normal"
        helperText="Query Genes"
        variant="outlined"
      />
    </Grid>

    <Grid item>
      <Button>Search</Button>
      <Button>Clear</Button>
    </Grid>
  </Grid>
)

export default SearchPanel
