import React, { useEffect } from 'react'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'

const formControl = {
  height: '3em',
  paddingTop: '0.5em',
  marginLeft: '0.3em'
}

const styles = theme => ({
  input: {
    padding: '8px 26px 8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 4,
    '&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 4
    },
    '&:hover': {
      backgroundColor: alpha('rgb(65, 84, 178)', 0.08)
    }
  },
  root: {
    borderColor: '#ced4da',
    '& $notchedOutline': {
      borderColor: 'rgb(65, 84, 178)'
    },
    '&:hover $notchedOutline': {
      borderColor: 'rgb(65, 84, 178)'
    },
    '&$focused $notchedOutline': {
      borderColor: 'rgb(65, 84, 178)',
      borderWidth: '1px'
    }
  },
  focused: {},
  notchedOutline: {}
})

const LayoutSelector = props => {
  const { classes } = props
  const menuItems = props.uiState.layouts
  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)

  const layoutDisplayNameMap = {
    'Preset': 'Default',
    'Cose': 'Spring',
    'Concentric': 'Concentric'
  };

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  return (
    <div style={formControl}>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} htmlFor="outlined">
          <font color="#4154b2">Layout</font>
        </InputLabel>
        <Select
          value={props.value}
          onChange={props.handleChange}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="layout"
              id="outlined-layout"
              classes={classes}
            />
          }
        >
          {menuItems
            ? menuItems.map(item => (
                <MenuItem value={item} key={item}>
                  <Typography variant="body2" color="textSecondary">
                    {layoutDisplayNameMap[item]}
                  </Typography>
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
    </div>
  )
}

export default withStyles(styles)(LayoutSelector)
