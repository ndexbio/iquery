import React, { useState } from 'react'
import HighlightIcon from '@material-ui/icons/WbIncandescent'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  buttonIcon: {
    paddingRight: '0.2em'
  },
  button: {
    height: '3em',
    maxWidth: '13em',
    minWidth: '13em',
    marginRight: '0.5em'
  }
})

const Highlighter = props => {
  const { classes } = props

  const [highlight, setHighlight] = useState(true)

  const handleChange = evt => {
    setHighlight(!highlight)
    props.uiStateActions.setHighlights(!highlight)
  }

  return (
    <Button
      className={classes.button}
      variant="outlined"
      color={highlight ? 'secondary' : 'default'}
      onClick={handleChange}
    >
      <HighlightIcon
        className={classes.buttonIcon}
        color={highlight ? 'secondary' : 'disabled'}
      />
      Highlight Genes
    </Button>
  )
}

export default withStyles(styles)(Highlighter)
