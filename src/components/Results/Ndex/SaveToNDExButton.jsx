import React, { useEffect } from 'react'
import './style.css'
import Keycloak from 'keycloak-js'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import { KEYCLOAK_CONFIG } from '../../../api/config'
import { getUserProfileInformation, LOGGED_OUT_USER_PROFILE } from '../../../authentication'

const styles = (theme) => ({
  buttonIcon: {
    padding: 0,
    margin: 0,
    paddingBottom: '0.1em',
  },
  button: {
    height: '2.5em',
    width: '4.3em',
    minWidth: '4.3em',
    marginLeft: '0.5em',
  },
})

const BootstrapButton = withStyles({
  root: {
    width: '4.3em',
    borderColor: '#212121',
    color: '#212121',
    '&:active': {
      borderColor: '#212121',
      color: '#212121',
    },
  },
})(Button)

const SaveToNDExButton = (props) => {
  const { classes } = props

  const initializeAuthentication = () => {
    const keycloak = new Keycloak(KEYCLOAK_CONFIG)
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then((authenticated) => {
        if (authenticated) {
          const userProfileInfo = getUserProfileInformation(keycloak)
          props.ndexSaveActions.setProfile(userProfileInfo)
          props.ndexSaveActions.setKeycloak(keycloak)
        } else {
          props.ndexSaveActions.setProfile(LOGGED_OUT_USER_PROFILE)
          props.ndexSaveActions.setKeycloak(keycloak)
        }
      })
      .catch((err) => {
        props.ndexSaveActions.setProfile(LOGGED_OUT_USER_PROFILE)
        props.ndexSaveActions.setKeycloak(keycloak)
        console.log(err)
      })
  }

  useEffect(initializeAuthentication, [])

  const handleSaveNetworkToNDEx = () => {
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
          onClick={handleSaveNetworkToNDEx}
        >
          <SaveIcon color={disabled ? 'disabled' : 'inherit'} fontSize="large" className={classes.buttonIcon} />
        </BootstrapButton>
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(SaveToNDExButton)
