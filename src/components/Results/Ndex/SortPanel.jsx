import React, { useState } from 'react'

import InfoModal from './InfoModal'

import { withStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputBase from '@material-ui/core/InputBase'

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
  display: 'inline-block',
  width: '100%'
}

const textStyle = {
  position: 'relative',
  top: '8px'
}

const selectStyle = {
  color: 'secondary'
}

const SortPanel = props => {
  const [sortBy, setSortBy] = useState(props.uiState.sortBy)
  const menuItems = props.uiState.sortOptions

  const handleChange = event => {
    props.uiStateActions.setSortBy(event.target.value)
    setSortBy(event.target.value)
  }

  if (props.uiState.selectedSource === 'enrichment') {
    return (
      <React.Fragment>
        <div style={divStyle}>
          <Typography
            variant="body2"
            display="inline"
            color="textSecondary"
            style={textStyle}
          >
            Sort by
          </Typography>
          <FormControl style={formStyle}>
            <Select
              value={sortBy}
              onChange={handleChange}
              displayEmpty
              name="Sort by"
              style={selectStyle}
              input={<BootstrapInput name="sort" id="sort-customized-select" />}
            >
              {menuItems.map(item => (
                <MenuItem value={item} key={item}>
                  <Typography variant="body2" color="textSecondary">
                    {item}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InfoModal />
        </div>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default SortPanel
