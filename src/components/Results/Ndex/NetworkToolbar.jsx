import './style.css'
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import OpenInCytoscapeButton from './OpenInCytoscapeButton'
import ResetZoomButton from './ResetZoomButton'
import Highlighter from './Highlighter'
import { Tooltip } from '@material-ui/core'
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
  const { classes, ...others } = props
  return (
    <div className={classes.toolbar}>
      <Tooltip title={props.network.networkName}>
        <Typography
          className={classes.title}
          variant="subtitle1"
          color="inherit"
          noWrap
        >
          {props.network.networkName}
        </Typography>
      </Tooltip>
      <div className={classes.grow} />
      <ResetZoomButton {...others} />
      <Highlighter {...others} />
      <NDExSignInModal {...others}>
        <NDExSave {...others} />
      </NDExSignInModal>
      <OpenInNDExButton {...others} />
      <OpenInCytoscapeButton {...others} />
      <OpenOriginalNetworkButton {...others} />
    </div>
  )
}

NetworkToolbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NetworkToolbar)
