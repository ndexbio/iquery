import React, { useEffect } from 'react'
import './style.css'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  ...theme,
  button: {
    padding: '0.3em'
  }
})

const CommandPanel = props => {
  const { classes } = props

  return (
    <div className="gene-list-header">
      <Typography variant="subtitle2">Search genes:</Typography>
    </div>
  )
}

export default withStyles(styles)(CommandPanel)
