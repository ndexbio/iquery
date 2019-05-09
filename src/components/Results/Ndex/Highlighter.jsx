import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const Highlighter = props => {
  const highlights = props.uiState.highlights
  const handleChange = (evt, checked) => {
    props.uiStateActions.setHighlights(checked)
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={highlights} onChange={handleChange} />}
        label="Highlight query genes"
      />
    </FormGroup>
  )
}

export default Highlighter
