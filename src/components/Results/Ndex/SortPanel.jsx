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
  paddingLeft: '16px',
  borderBottom: '1px solid rgba(239, 239, 239, 1)',
  display: 'flex',
  minHeight: '56px',
  height: 'auto',
  width: '100%',
  alignItems: 'center'
}

const textStyle = {
  // position: 'relative',
  // top: '8px'
}

const selectStyle = {
  color: 'secondary'
}

const radioStyle = { 
  marginRight: '20px'
}

const radioButtonsDiv = {
  alignItems: 'center'
}

const sortInfoStyle = {
  flexBasis: '100px',
}
const SortPanel = props => {
  const [sortBy, setSortBy] = useState(props.uiState.sortBy)
  const sortOptions = props.uiState.sortOptions

  const handleChange = event => {
    props.uiStateActions.setSortBy(event.target.value)
    setSortBy(event.target.value)
  }

  if (props.uiState.selectedSource === 'enrichment') {
    return (
      <React.Fragment>
        <div style={divStyle}>
          <div style={sortInfoStyle}>
            <InfoModal />
            <Typography
              variant="body2"
              display="inline"
              color="textSecondary"
              style={textStyle}
            >
              Sort by
            </Typography>
          </div>
          <div style={radioButtonsDiv}>
            {sortOptions.map(option => (
              <FormControlLabel
                  key={option}
                  style={radioStyle}
                  value="top"
                  control={<Radio checked={sortBy === option} value={option} onChange={handleChange}></Radio>}
                  label={option}
                  labelPlacement="end"
              />
            ))}
          </div>
          {/* <FormControl style={formStyle}>
            <Select
              value={sortBy}
              onChange={handleChange}
              displayEmpty
              name="Sort by"
              style={selectStyle}
              input={<BootstrapInput name="sort" id="sort-customized-select" />}
            >
              {sortOptions.map(item => (
                <MenuItem value={item} key={item}>
                  <Typography variant="body2" color="textSecondary">
                    {item}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default SortPanel
