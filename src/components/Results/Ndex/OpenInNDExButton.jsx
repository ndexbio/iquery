import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/ndex-logo.svg'
import { withStyles } from '@material-ui/core'

import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    marginRight: '0.5em',
    minWidth: '5em'
  }
})

const OpenInNDExButton = props => {
  const { classes } = props

  const handleImportNetwork = () => {
    props.ndexSaveActions.setNDExModalOpen(true)
  }

  return (
    <Tooltip title="Save this network to your NDEx account" placement="bottom">
      <div>
        <Button
          className={classes.button}
          variant="contained"
          color="default"
          disabled={!(props.network.uuid && props.network.uuid.length > 0)}
          onClick={handleImportNetwork}
        >
          <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
        </Button>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInNDExButton)
