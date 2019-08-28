import React, { useState } from 'react'
import {connect} from 'react-redux'

import { makeStyles, withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

import {setSortOrder} from '../../../actions/uiState'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: '0',
    },
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
    },
  },
}))(InputBase);

const formStyle = {
  position: 'relative',
  left: '11px',
  marginTop: '8px',
  marginBottom: '8px'
}

const divStyle = {
  paddingLeft: '16px',
  borderBottom: '1px solid rgba(239, 239, 239, 1)',
}

const typeStyle = {
  position: 'relative',
  top: '14.5px'
}

const selectStyle = {
  color: 'secondary'
}

const SortPanel = props => {
  const [sortPValueOn, setSortPValueOn] = useState(true)

  const handleChange = event => {
    if (event.target.value === 'p-Value') {
      setSortPValueOn(true)
      props.uiStateActions_setSortOrder(['p-Value', 'Overlap'])
    } else {
      setSortPValueOn(false)
      props.uiStateActions_setSortOrder(['Overlap', 'p-Value'])
    }
  }
  
  if (props.uiState_selectedSource === 'enrichment') {
    return (
      <div style={divStyle}>
        <Typography 
          variant='body2'
          display='inline'
          style={typeStyle}
          color='textSecondary'
        >
          Sort by
        </Typography>
        <FormControl style={formStyle}>
          <Select
            value={sortPValueOn ? 'p-Value' : 'Overlap'}
            onChange={handleChange}
            displayEmpty
            name="Sort by"
            style={selectStyle}
            input={<BootstrapInput name="age" id="age-customized-select" />}
          >
            <MenuItem value={'p-Value'}>
              <Typography variant="body2" color='textSecondary'>
                p-Value
              </Typography>
            </MenuItem>
            <MenuItem value={'Overlap'}>
              <Typography variant="body2" color='textSecondary'>
                Overlap
              </Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = state => {
  return {
    uiState_selectedSource: state.uiState.selectedSource
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uiStateActions_setSortOrder: (payload) => dispatch(setSortOrder(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (SortPanel)
            