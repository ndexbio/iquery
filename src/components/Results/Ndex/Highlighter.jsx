import React from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const Highlighter = props => {
  const highlights = props.uiState.highlights
  const handleChange = (evt, checked) => {
    props.uiStateActions.setHighlights(checked)
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={highlights} onChange={handleChange} />}
        label="Highlight Query Genes"
      />
    </FormGroup>
  )
}

export default Highlighter
