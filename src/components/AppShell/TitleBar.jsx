import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HelpIcon from '@material-ui/icons/Help'
import classNames from 'classnames'
import github from '../../assets/images/github.svg'

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
  },
  headerLogo: {
    height: '1.4em'
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
          <div className={classes.grow}>
            <Typography variant="h6" color="inherit">
              NDEx Network Search:
            </Typography>
            <Typography variant="body1">
              Pathway Enrichment / Gene Neighborhoods / Keywords
            </Typography>
          </div>
          <div>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              onClick={() => openLink(HELP_URL)}
            >
              <HelpIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              onClick={() => openLink(GITHUB_URL)}
            >
              <img src={github} className={classes.headerLogo} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

// TODO: replace this to the actual help page
const HELP_URL = 'https://www.cytoscape.org/'
const GITHUB_URL = 'https://github.com/idekerlab/cytoscape-cloud-portal'

const openLink = url => {
  window.open(url, '_blank')
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(TitleBar)
