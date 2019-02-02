import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import HelpIcon from '@material-ui/icons/Help'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import classNames from 'classnames'
import logo from '../../assets/images/cytoscape-logo.svg'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  logo: {
    height: '2.5em',
    marginRight: '0.7em'
  }
})

class TitleBar extends React.Component {
  handleMenu = () => {
    this.props.uiStateActions.setSettingsOpen(
      !this.props.uiState.isSettingsOpen
    )
  }

  render() {
    const { classes } = this.props
    const open = this.props.uiState.isSettingsOpen

    return (
      <AppBar
        position="fixed"
        color="inherit"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            className={classNames(classes.menuButton, open && classes.hide)}
            color="inherit"
            aria-label="Menu"
            onClick={this.handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} className={classes.logo} />
          <Typography variant="h5" color="inherit" className={classes.grow}>
            Cytoscape Cloud &alpha;
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              color="inherit"
            >
              <HelpIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(TitleBar)
