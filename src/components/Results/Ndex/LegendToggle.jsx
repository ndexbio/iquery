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

  const title = props.enableLegend ? 'Show/hide legend' : 'Legend is not available for this network';
  return (
      <Tooltip title={title}>
            <div style={formControl}>
            <FormControl variant="outlined" disabled={!props.enableLegend}>
                <InputLabel ref={inputLabel} htmlFor="outlined">
                <font color={ props.enableLegend ? "#4154b2" : "gray" }>Legend</font>
                </InputLabel>
                <Select
                value={props.uiState.showLegend}
                onChange={e => props.uiStateActions.setShowLegend(e.target.value)}
                input={
                    <OutlinedInput
                    labelWidth={labelWidth}
                    name="legend"
                    id="outlined-legend"
                    classes={classes}
                    />
                }
                >
                    <MenuItem value={true}>
                        <Typography variant="body2" color="textSecondary">
                            Show
                        </Typography>
                    </MenuItem>
                    <MenuItem value={false}>
                        <Typography variant="body2" color="textSecondary">
                            Hide
                        </Typography>
                    </MenuItem>
                </Select>
            </FormControl>
            </div>
      </Tooltip>
  )
}

export default withStyles(styles)(LegendToggle)
