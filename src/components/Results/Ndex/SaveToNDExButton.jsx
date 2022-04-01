import React from 'react'
import './style.css'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

const styles = theme => ({
  buttonIcon: {
    padding: 0,
    margin: 0,
    paddingBottom: '0.1em'
  },
  button: {
    height: '2.5em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em'
  }
})

const BootstrapButton = withStyles({
  root: {
    width: '4.3em',
    borderColor: '#212121',
    color: '#212121',
    '&:active': {
      borderColor: '#212121',
      color: '#212121'
    }
  }
})(Button)

const SaveToNDExButton = props => {
  const { classes } = props

  const handleImportNetwork = () => {

  //checking if user has logged in already
  let loggedInUserRaw = window.localStorage.getItem('loggedInUser');
  if (loggedInUserRaw){
    let loggedInUser = JSON.parse(loggedInUserRaw);
    if (loggedInUser !== null){
      let lProfile = {};
      lProfile.name = loggedInUser.firstName;
      lProfile.image = loggedInUser.image;
      lProfile.authorization = {};
      lProfile.authorization.type = "ndex";
      lProfile.authorization.token = 'Basic ' + window.btoa(loggedInUser.userName + ':' + loggedInUser.token);
      props.ndexSaveActions.setProfile(lProfile);
    }
  }
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
          <SaveIcon
            color={disabled ? 'disabled' : 'inherit'}
            fontSize="large"
            className={classes.buttonIcon}
          />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(SaveToNDExButton)

/*
            color={disabled ? 'disabled' : 'inherit'}
            className={classes.buttonIcon}
            */
