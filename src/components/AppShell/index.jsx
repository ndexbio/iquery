import React, { useEffect } from 'react'
import './style.css'

import TitleBar from './TitleBar'
import SettingsPanel from '../SettingsPanel'

import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    // height: '100vmin'
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 0.5em',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    // flexGrow: 1,
    // transition: theme.transitions.create('margin', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen
    // }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

const AppShell = props => {
  useEffect(() => {
    const urlParams = new URLSearchParams(props.history.location.search)
    const cyrestport = urlParams.get('cyrestport')
    if (cyrestport) {
      props.cyrestActions.setPort(cyrestport)
    }
    return () => {}
  }, [])
  const { classes, ...others } = props

  const open = props.uiState.isSettingsOpen
  const hideSearchBar = props.uiState.hideSearchBar;
  return (
    <div className={classes.root}>
      <CssBaseline />
      {hideSearchBar ? null : <TitleBar {...others} />}

      {/* <div
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      /> */}
      {props.children}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(AppShell)
