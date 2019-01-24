import React from 'react'
import { makeStyles } from '@material-ui/styles'
import TextField from '@material-ui/core/TextField'

const SearchPanel = props => {
  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        rowsMax="4"
        value={this.state.multiline}
        onChange={this.handleChange('multiline')}
        margin="normal"
        helperText="Search Query"
        variant="outlined"
      />
    </div>
  )
}

export default SearchPanel
