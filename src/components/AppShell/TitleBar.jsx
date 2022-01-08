import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import classNames from 'classnames';

import logo from '../../assets/images/ndex-logo.svg';
//import cytoLogo from '../../assets/images/cytoscape-logo-mono-dark.svg'
//import nrnbLogo from '../../assets/images/nrnb-logo-mono-dark.svg'
//import wpLogo from '../../assets/images/wp-logo-mono-dark.svg'
//import idekerLogo from '../../assets/images/ideker-logo-mono-dark.svg'
import HomeIcon from '@material-ui/icons/Home';

import GeneTextBox from './GeneTextBox';

import { HELP_URL } from '../../api/config';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 10,
  },
  logo: {
    height: '1em',
    width: '1.5em',
  },
  homeLogo: {
    height: '1em',
    width: '1em',
    marginRight: '0.5em',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  textBox: {
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  noWrap: {
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
});

const titleStyle = {
  position: 'relative',
  left: '1em',
  textTransform: 'none',
};

class TitleBar extends React.Component {
  handleMenu = () => {
    this.props.uiStateActions.setSettingsOpen(
      !this.props.uiState.isSettingsOpen
    );
  };

  handleHomeButton = () => {
    this.props.searchActions.clearAll();
    this.props.uiStateActions.setSelectedSource('enrichment');
    this.props.networkActions.networkClear();
    this.props.history.push('/');
  };

  render() {
    const { classes, ...others } = this.props;
    const open = this.props.uiState.isSettingsOpen;

    const {searchResults} = this.props.search

    return (
      <AppBar
        position='fixed'
        color='inherit'
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <div className={classes.noWrap}>
          <Toolbar disableGutters={!open}>
            <Tooltip
              title='Search by Relevant Pathways / Protein-Protein Interactions / Gene Association'
              aria-label='NDEx_tooltip'
            >
              <div>
                <Button style={titleStyle} onClick={this.handleHomeButton}>
                  <HomeIcon fontSize='default' className={classes.homeLogo} />
                  <Typography variant='h6' color='inherit' noWrap={true}>
                    NDEx Integrated Query
                  </Typography>
                </Button>
              </div>
            </Tooltip>

            {searchResults === null ? (
              <div />
            ) : (
              <div className={classes.textBox}>
                <GeneTextBox searchResults={searchResults} {...others} />
              </div>
            )}

            <div className={classes.grow} />

            <div>
              <Tooltip title='NDEx' placement='bottom'>
                <IconButton
                  color='default'
                  aria-label='Home'
                  onClick={() => openLink("/")}
                >
                  <img alt='NDEx logo' src={logo} className={classes.logo} />
                </IconButton>
              </Tooltip>

              <Tooltip
                title='Help'
                placement='bottom'
                style={{ marginRight: '1em' }}
              >
                <Typography color='textPrimary' noWrap={true} display='inline'>
                  <IconButton
                    aria-haspopup='true'
                    onClick={() => openLink(HELP_URL)}
                    color='inherit'
                  >
                    <HelpIcon className={classes.logo} />
                  </IconButton>
                </Typography>
              </Tooltip>
            </div>
          </Toolbar>
        </div>
      </AppBar>
    );
  }
}


const openLink = (url) => {
  window.open(url, '_blank');
};

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TitleBar);
