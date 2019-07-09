import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import logo from '../../../assets/images/ndex-logo.svg'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  buttonIcon: {
    height: '2.5em',
    paddingLeft: '0.5em'
  }
})

const handleImportNetwork = () => {

}

const OpenInNDExButton = (props) => {
  const { classes } = props

  return ( 
    <Button variant="contained" color="default"
      disabled={!(props.network.uuid && props.network.uuid.length > 0)}
      onClick={handleImportNetwork}>
      Save To
      <img alt="NDEx logo" src={logo} className={classes.buttonIcon} />
    </Button>
  )
}

export default withStyles(styles)(OpenInNDExButton)
