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
    marginLeft: '8px',
    width: '120px',
    padding: '8px 12px 8px 12px',
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
  legendDisabled: {
    marginLeft: '8px',
    width: '120px',
    padding: '8px 12px 8px 12px',
    cursor: 'default',
    borderColor: '#ced4da',
    color: 'gray',
  },
  focused: {},
  notchedOutline: {}
})

const LegendToggle = props => {
  const { classes } = props

  // anytime the network changes or a new source tab is changed, hide the legend
  useEffect(() => {
    props.uiStateActions.setShowLegend(false);
  }, [props.uiState.selectedSource, props.network])

  const title = props.enableLegend ? 'Toggle network legend' : 'Legend is not available for this network';
  const label = props.enableLegend ? props.uiState.showLegend ? 'Hide Legend' : 'Show Legend' : 'Show Legend';
  return (
    <Tooltip title={title}>
      {
        props.legendEnabled ?         
        <Button
          variant="outlined" color="primary"
          value={props.uiState.showLegend}
          onClick={e => props.uiStateActions.setShowLegend(!props.uiState.showLegend)}
          className={classes.root}
        >
          <Typography variant="caption">{label}</Typography>
        </Button> : 
        <Button
        variant="outlined" color="primary"
        value={props.uiState.showLegend}
        className={classes.legendDisabled}
      >
        <Typography variant="caption">{label}</Typography>
      </Button>
    }
    </Tooltip>
  )
}

export default withStyles(styles)(LegendToggle)
