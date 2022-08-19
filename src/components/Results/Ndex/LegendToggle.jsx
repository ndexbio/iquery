import React, { useEffect } from 'react'

import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import Tooltip from '@material-ui/core/Tooltip'
import { Button } from '@material-ui/core'
const formControl = {
  height: '3em',
  paddingTop: '0.5em',
  marginLeft: '0.3em',
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
    },
    cursor: 'pointer',
  },
  root: {
    width: '80px',
    height: '2.5em',
    color: '#76767A',
    fontSize: 14,
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
  disabled: {
    padding: '8px 26px 8px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderRadius: 4,
    '&:focus': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 4
    },
    '&:hover': {
      backgroundColor: alpha('rgb(65, 84, 178)', 0.08)
    },
    cursor: 'pointer',

    width: '80px',
    height: '2.5em',
    color: '#D6D6D6',
    fontSize: 14,
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
  notchedOutline: {},
  // label: {
  //   cursor: 'pointer'
  // }
})

const LegendToggle = props => {
  const { classes } = props

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)


  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  // anytime the network changes or a new source tab is changed, hide the legend
  useEffect(() => {
    props.uiStateActions.setShowLegend(false);
  }, [props.uiState.selectedSource, props.network])

  const title = props.enableLegend ? 'Toggle network legend' : 'Legend is not available for this network';
  const label = props.enableLegend ? props.uiState.showLegend ? 'Hide' : 'Show' : 'Show';

  const style = {
    color: !props.legendEnabled ? '#d6d6d6' : null,
    cursor: !props.legendEnabled ? 'default' : 'pointer' 
  }

  return (
    <Tooltip title={title} disableFocusListener>
    <div style={formControl}>
      <FormControl variant="outlined">
        <InputLabel ref={inputLabel} htmlFor="outlined">
          <font color="#4154b2">Legend</font>
        </InputLabel>
        {
          props.enableLegend ? 
          <OutlinedInput
          style={{cursor: 'pointer'}}
          readOnly={true}
          labelWidth={labelWidth}
          name="layout"
          id="outlined-layout"
          classes={classes}
          color="primary"
          value={label}
          onClick={e => props.uiStateActions.setShowLegend(!props.uiState.showLegend)}
        />  : 
        <OutlinedInput
        readOnly={true}
        labelWidth={labelWidth}
        name="layout"
        id="outlined-layout"
        classes={classes}
        color="primary"
        style={{color: '#d6d6d6', cursor: 'default !important'}}
        value={label}
    /> 
        }
      </FormControl>
    </div>
    </Tooltip>
  )
}

export default withStyles(styles)(LegendToggle)
