import React from 'react'

import HighlightIcon from '@material-ui/icons/WbIncandescent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    textAlign: 'center',
    lignHeight: '50%',
    position: 'relative',
    top: '1px'
  },
  button: {
    height: '3em',
    width: '4.3em',
    marginLeft: '0.5em'
  }
})

const Highlighter = props => {
  const { classes } = props
  const disabled = !(props.network.uuid && props.network.uuid.length > 0)

  let highlight = props.uiState.highlights

  const handleChange = evt => {
    if (props.network.uuid && props.network.uuid.length > 0) {
      highlight = !highlight
      props.uiStateActions.setHighlights(highlight)
    }
  }

  return (
    <Tooltip title="Highlight genes" placement="bottom">
      <div>
        <Button
          className={classes.button}
          variant="outlined"
          color={highlight ? 'secondary' : 'default'}
          onClick={handleChange}
          disabled={disabled}
        >
          <HighlightIcon
            className={classes.buttonIcon}
            color={highlight && !disabled ? 'secondary' : 'disabled'}
          />
        </Button>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(Highlighter)
