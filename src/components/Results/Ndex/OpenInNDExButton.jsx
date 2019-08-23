import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/ndex-logo.svg'
import logoDisabled from '../../../assets/images/ndex-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'


const styles = theme => ({
  buttonIcon: {
    height: '2em'
  },
  button: {
    height: '3em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em',
    color: '#4DA1DE'
    
  }
})

const BootstrapButton = withStyles({
  root: {
    width: '4.3em',
    borderColor: '#4DA1DE',
    color: '#4DA1DE',
    '&:active': {
      borderColor: '#4DA1DE',
      color: '#4DA1DE'
    },
  },
})(Button);

const OpenInNDExButton = props => {
  const { classes } = props

  const handleImportNetwork = () => {
    props.ndexSaveActions.setNDExModalOpen(true)
  }

  const disabled = !(props.network.uuid && props.network.uuid.length > 0)

  return (
    <Tooltip title="Save this network to your NDEx account" placement="bottom">
      <div>
        <BootstrapButton
          className={classes.button}
          variant="outlined"
          disabled={disabled}
          onClick={handleImportNetwork}
        >
          <img alt="NDEx logo" src={disabled ? logoDisabled: logo} className={classes.buttonIcon} />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(OpenInNDExButton)
