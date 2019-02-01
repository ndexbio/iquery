import React from 'react'
import './style.css'
import InputPanel from '../InputPanel'
import Results from '../Results'
import TitleBar from './TitleBar'
import SettingsPanel from '../SettingsPanel'

import CssBaseline from '@material-ui/core/CssBaseline'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import { AppBar, Toolbar } from "@material-ui/core";

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vmin'
  },
  drawerHeader: {
    display: 'flex',
    padding: '0 8px',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
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

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const HomePanel = props => {
  const { classes, theme } = props

  const open = props.uiState.isSettingsOpen

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TitleBar {...props} />
      <SettingsPanel {...props} />

      <div
        className={classNames(classes.content, {
          [classes.contentShift]: open
        })}
      >

        <div className="container">
          <InputPanel className="input" {...props} />
          <Results className="results" {...props} />
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(HomePanel)
