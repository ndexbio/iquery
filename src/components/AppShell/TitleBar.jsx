import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import HelpIcon from '@material-ui/icons/Help'
import Tooltip from '@material-ui/core/Tooltip'

import classNames from 'classnames'

import logo from '../../assets/images/ndex-logo-mono.svg'
import cytoLogo from '../../assets/images/cytoscape-logo-mono.svg'
import nrnbLogo from '../../assets/images/nrnb-logo.svg'
import wpLogo from '../../assets/images/wp-logo.svg'
import HomeIcon from '@material-ui/icons/Home'

import GeneTextBox from './GeneTextBox'

import {setSettingsOpen} from '../../actions/uiState'
import {clearAll} from '../../actions/search'
import {networkClear} from '../../actions/network'

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
  logo: {
    height: '1em',
    width: '1.5em'
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
  textBox: {
    position: 'relative',
    left: '16px'
  }
})

const titleStyle = {
  position: 'relative',
  left: '16px'
}

class TitleBar extends React.Component {
  handleMenu = () => {
    this.props.uiStateActions_setSettingsOpen(
      !this.props.uiState_isSettingsOpen
    )
  }

  handleHomeButton = () => {
    this.props.searchActions_clearAll()
    this.props.networkActions_networkClear()
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    const open = this.props.uiState_isSettingsOpen

    return (
      <AppBar
        position="fixed"
        color="inherit"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar disableGutters={!open}>
          <Tooltip title="Search by Pathway Enrichment / Gene Neighborhoods / Keywords" aria-label="NDEx_tooltip">
            <div>
              <Typography variant="h6" color="inherit" style={titleStyle}>
                NDEx Network Search
              </Typography>
            </div>
          </Tooltip>

          {this.props.search_results === null ? (
            <div />
          ) : (
            <div className={classes.textBox}>
              <GeneTextBox 
                history={this.props.history}
              />
             </div>
          )}

          <div className={classes.grow} />

          <div>
          <Tooltip title="Home" placement="bottom">
              <IconButton
                aria-haspopup="true"
                color="default"
                onClick={this.handleHomeButton}
              >
                <HomeIcon fontSize="default" className={classes.logo}/>
              </IconButton>
            </Tooltip>
              
            <Tooltip title="Help" placement="bottom">
              <IconButton
                aria-haspopup="true"
                color="default"
                onClick={() => openLink(HELP_URL)}
              >
                <HelpIcon fontSize="default" className={classes.logo}/>
              </IconButton>
            </Tooltip>

            <Tooltip title="NDEx" placement="bottom">
              <IconButton
                color="default"
                aria-label="Home"
                onClick={() => openLink(NDEX_URL)}
              >
                <img alt="NDEx logo" src={logo} className={classes.logo} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Cytoscape" placement="bottom">
              <IconButton
                color="default"
                onClick={() => openLink(CYTOSCAPE_URL)}
              >
                <img alt="Cytoscape Logo" src={cytoLogo} className={classes.logo}/>
              </IconButton>
            </Tooltip>

            <Tooltip title="NRNB" placement="bottom">
              <IconButton
                color="default"
                aria-label="Home"
                onClick={() => openLink(NRNB_URL)}
              >
                <img alt="NRNB logo" src={nrnbLogo} className={classes.logo} />
              </IconButton>
            </Tooltip>

            <Tooltip title="WikiPathways" placement="bottom">
              <IconButton
                color='default'
                onClick={()=> openLink(WP_URL)}
              >
                <img alt="WikiPathways Logo" src={wpLogo} className={classes.logo}/>
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

// TODO: replace this to the actual help page
const HELP_URL = 'https://github.com/idekerlab/search-portal/wiki'
const NDEX_URL = 'https://www.ndexbio.org/'
const CYTOSCAPE_URL = 'https://cytoscape.org/'
const NRNB_URL = 'https://nrnb.org/'
const WP_URL = 'https://www.wikipathways.org/'

const openLink = url => {
  window.open(url, '_blank')
}

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    uiState_isSettingsOpen: state.uiState.isSettingsOpen,
    search_results: state.search.results
  }
}

const mapDispatchToProps = dispatch => {
  return {
    uiStateActions_setSettingsOpen: (payload) => dispatch(setSettingsOpen(payload)),
    searchActions_clearAll: (payload) => dispatch(clearAll(payload)),
    networkActions_networkClear: (payload) => dispatch(networkClear(payload))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true})(TitleBar))