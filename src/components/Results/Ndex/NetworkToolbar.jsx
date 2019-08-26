import './style.css'
import React from 'react'
import PropTypes from 'prop-types'

import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip } from '@material-ui/core'

import OpenInCytoscapeButton from './OpenInCytoscapeButton'
import ResetZoomButton from './ResetZoomButton'
import Highlighter from './Highlighter'
import OpenInNDExButton from './OpenInNDExButton'
import NDExSignInModal from '../../NDExSignInModal'
import NDExSave from '../../NDExSave'
import OpenOriginalNetworkButton from './OpenOriginalNetworkButton'


const styles = theme => ({
  toolbar: {
    background: '#EFEFEF',
    height: '4em',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  buttonIcon: {
    height: '2.5em',
    paddingLeft: '0.5em'
  },
  buttons: {
    padding: '0.3em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: 'solid 1px #999999'
  },
  openIcon: {
    marginRight: '0.5em'
  }
})

const NetworkToolbar = props => {
  const { classes } = props
  return (
    <div className={classes.toolbar}>
      <Tooltip title={props.network_networkName}>
        <Typography
          className={classes.title}
          variant="subtitle1"
          color="inherit"
          noWrap
        >
          {props.network_networkName}
        </Typography>
      </Tooltip>
      <div className={classes.grow} />
      <ResetZoomButton
        network_uuid={props.network_uuid}
        uiStateActions_setZoomed={props.uiStateActions_setZoomed}
      />
      <Highlighter
        network_uuid={props.network_uuid}
        uiState_highlights={props.uiState_highlights}
        uiStateActions_setHighlights={props.uiStateActions_setHighlights}
      />
      <NDExSignInModal
        ndexSave_ndexModal={props.ndexSave_ndexModal}
        ndexSave_profile={props.ndexSave_profile}
        ndexSave_networkUrl={props.ndexSave_networkUrl}

        ndexSave_errorMessage={props.ndexSave_errorMessage}
        ndexSaveActions_setProfile={props.ndexSaveActions_setProfile}
        ndexSaveActions_setNDExModalOpen={props.ndexSaveActions_setNDExModalOpen}
        ndexSaveActions_saveToNDEx={props.ndexSaveActions_saveToNDEx}
        ndexSaveActions_credentialsSignOn={props.ndexSaveActions_credentialsSignOn}
        ndexSaveActions_googleSignOn={props.ndexSaveActions_googleSignOn}
        ndexSaveActions_setErrorMessage={props.ndexSaveActions_setErrorMessage}

        network_originalCX={props.network_originalCX}

      >
        <NDExSave
          ndexSave_networkUrl={props.ndexSave_networkUrl}
          ndexSave_profile={props.ndexSave_profile}

          ndexSaveActions_setNDExModalOpen={props.ndexSaveActions_setNDExModalOpen}
          ndexSaveActions_saveToNDEx={props.ndexSaveActions_saveToNDEx}

          network_originalCX={props.network_originalCX}
        />
      </NDExSignInModal>
      <OpenInNDExButton 
        network_uuid={props.network_uuid}
        ndexSaveActions_setNDExModalOpen={props.ndexSaveActions_setNDExModalOpen}
      />
      <OpenInCytoscapeButton
        handleImportNetwork={props.handleImportNetwork} 

        cyrest_available={props.cyrest_available}
        cyrest_isLoadingNetwork={props.cyrest_isLoadingNetwork}
        cyrest_lastResponse={props.cyrest_lastResponse}
        cyrestActions_startCyrestPolling={props.cyrestActions_startCyrestPolling}
        cyrestActions_stopCyrestPolling={props.cyrestActions_stopCyrestPolling}

        network_uuid={props.network_uuid}
      />
      <OpenOriginalNetworkButton
        network_uuid={props.network_uuid}
      />
    </div>
  )
}

NetworkToolbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NetworkToolbar)