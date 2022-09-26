import React, { useState } from 'react'

import InfoModal from './InfoModal'

import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio'


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: '0'
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1px solid #ced4da',
    textColor: '#757575',
    padding: '5px 26px 5px 12px',
    '&:focus': {
      borderRadius: 4,
      backgroundColor: '#FFFFFF'
    }
  }
}))(InputBase)

const formStyle = {
  position: 'relative',
  left: '11px',
  marginTop: '8px',
  marginBottom: '8px'
}

const divStyle = {
  position: 'sticky',
  top: '0px',
  paddingLeft: '12px',
  borderBottom: '1px solid rgba(239, 239, 239, 1)',
  display: 'flex',
  minHeight: '56px',
  height: 'auto',
  width: '100%',
  alignItems: 'center',
  backgroundColor: 'white',
  zIndex: 1
}

const textStyle = {
}

const selectStyle = {
  color: 'secondary'
}

const radioStyle = { 
  marginRight: '20px'
}

const radioButtonsDiv = {
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0
}

const sortInfoStyle = {
  flexBasis: '100px',
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  marginRight: '10px'
}
const SortPanel = props => {
  const [sortBy, setSortBy] = useState(props.uiState.sortBy)
  const sortOptions = props.uiState.sortOptions

  const handleChange = event => {
    props.uiStateActions.setSortBy(event.target.value)
    setSortBy(event.target.value)
  }

    return (
      <React.Fragment>
        <div style={divStyle}>
          <div style={sortInfoStyle}>
          {props.uiState.selectedSource !== 'protein-interactions' ? <InfoModal /> : null}
            
            <Typography
              variant="body2"
              display="inline"
              color="textSecondary"
              style={textStyle}
            >
              {props.uiState.selectedSource !== 'protein-interactions' ? 'Sort by' : null}
            </Typography>
          </div>
          <div style={radioButtonsDiv}>
            {props.uiState.selectedSource !== 'protein-interactions' ? sortOptions.map(option => (
              <FormControlLabel
                  key={option}
                  style={radioStyle}
                  value="top"
                  control={<Radio color='primary' checked={sortBy === option} value={option} onChange={handleChange}></Radio>}
                  label={<Typography variant="body2">{option}</Typography>}
                  labelPlacement="end"
              />
            )) : null}
          </div>
        </div>
      </React.Fragment>
    )
}

export default SortPanel
