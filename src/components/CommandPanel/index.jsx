import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import './style.css'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'
import RefreshIcon from '@material-ui/icons/Refresh'

const styles = theme => ({
  ...theme,
  button: {
    padding: '0.3em'
  }
})

const CommandPanel = props => {
  const { classes } = props

  const handleStartOver = event => {
    props.searchActions.clearAll()
    props.history.push('/')
  }

  return (
    <div className="buttons">
      <Tooltip title="Restart Search" placement="bottom">
        <Button
          className={classes.button}
          variant="contained"
          size="small"
          color="secondary"
          onClick={handleStartOver}
          fullWidth
        >
          <RefreshIcon />
        </Button>
      </Tooltip>
    </div>
  )
}

export default withStyles(styles)(CommandPanel)
