import React from 'react'
import { Typography } from '@material-ui/core'
import cytoLogo from '../../../assets/images/cytoscape-logo-mono.svg'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import './style.css'

const styles = theme => ({
  logo: {
    height: '1em',
    width: '1.5em'
  }
})

const handleClick = () => {
  console.log('click')
}

const Warning = props => {
  const { classes } = props

  if (props.network_uuid && props.network_uuid.length > 0 && props.cyrest_available) {
    return (
      <Tooltip title="Open in cytoscape" placement="bottom">
        <IconButton
          aria-haspopup="true"
          color="default"
          onClick={handleClick}
        >
          <img alt="Cytoscape logo" src={cytoLogo} className={classes.logo} />
        </IconButton>
      </Tooltip>
    )
  } else {
    return (
      <div className="warning-container">
        <div className="warning-message-box">

          <Typography variant="h6">
            Network is too big for interactive view
          </Typography>
          <Typography variant="subtitle1" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    network_uuid: state.network.uuid,
    cyrest_available: state.cyrest.available
  }
}

export default connect(
  mapStateToProps
)(withStyles(styles)(Warning))
