import React, { useCallback, useEffect } from 'react'
import './style.css'
import Keycloak from 'keycloak-js'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

import { KEYCLOAK_CONFIG, SERVICE_SERVER_URL } from '../../../api/config'
import { AUTH_TYPE, getUserProfileInformation, LOGGED_OUT_USER_PROFILE } from '../../../authentication'
import { NDEx } from '@js4cytoscape/ndex-client'
import EmailVerificationModal from './EmailVerification'

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
  const [showVerificationModal, setShowVerificationModal] = React.useState(false)

  let isAuthenticated = false
  let emailUnverified = false
  let userName = ''
  let userEmail = ''

  const handleVerify = async () => {
    await props.ndexSave.keycloak.loadUserProfile()
    window.location.reload()
  }
  const handleCancel = () => {
    props.ndexSave.keycloak.logout()
  }

  const initializeAuthentication = () => {
    const keycloak = new Keycloak(KEYCLOAK_CONFIG)
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      })
      .then(async (authenticated) => {
        isAuthenticated = authenticated
        emailUnverified = true
        userName = ''
        userEmail = ''
        if (authenticated) {
          const ndex = new NDEx(SERVICE_SERVER_URL)
          await ndex.signInFromIdToken(keycloak.token)
          const userProfileInfo = getUserProfileInformation(keycloak)
          props.ndexSaveActions.setProfile(userProfileInfo)
          props.ndexSaveActions.setKeycloak(keycloak)
        } else {
          props.ndexSaveActions.setProfile(LOGGED_OUT_USER_PROFILE)
          props.ndexSaveActions.setKeycloak(keycloak)
        }
      })
      .catch((err) => {
        const errorCode = err?.response?.data?.errorCode ?? ''
        if (errorCode === 'NDEx_User_Account_Not_Verified') {
          emailUnverified = true
          keycloak.loadUserInfo().then((userInfo) => {
            userName = userInfo.name
            userEmail = userInfo.email
            const userProfileInfo = getUserProfileInformation(keycloak)
            props.ndexSaveActions.setProfile(userProfileInfo)
            props.ndexSaveActions.setKeycloak(keycloak)
            setShowVerificationModal(true)
          })
        } else {
          props.ndexSaveActions.setProfile(LOGGED_OUT_USER_PROFILE)
          props.ndexSaveActions.setKeycloak(keycloak)
        }
      })
  }

  useEffect(initializeAuthentication, [])

  const disabled = !(props.network.uuid && props.network.uuid.length > 0)

  const handleSaveClick = useCallback(() => {
    const userProfileInfo = getUserProfileInformation(props.ndexSave.keycloak)
    if (userProfileInfo.type === AUTH_TYPE.KEYCLOAK) {
      props.ndexSaveActions.setNDExModalOpen(true)
    } else {
      if (props.ndexSave.keycloak != null) {
        props.ndexSave.keycloak.login()
      }
    }
  }, [props.ndexSave.keycloak, props.ndexSaveActions])
  return (
    <Tooltip title="Save this network to your NDEx account" placement="bottom">
      <div>
        <BootstrapButton
          className={classes.button}
          variant="outlined"
          disabled={disabled}
          onClick={() => handleSaveClick()}
        >
          <SaveIcon color={disabled ? 'disabled' : 'inherit'} fontSize="large" className={classes.buttonIcon} />
        </BootstrapButton>
        <EmailVerificationModal
          open={showVerificationModal}
          onVerify={handleVerify}
          onCancel={handleCancel}
          userName={userName}
          userEmail={userEmail}
        />
      </div>
    </Tooltip>
  )
}

export default withStyles(styles)(SaveToNDExButton)
