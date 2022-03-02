import './style.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import HoverTab from '../HoverTab';

import OpenInCytoscapeButton from './OpenInCytoscapeButton';
import ResetZoomButton from './ResetZoomButton';
import ResetPathwayFigureZoomButton from './ResetPathwayFigureZoomButton';
import Highlighter from './Highlighter';
import SaveToNDExButton from './SaveToNDExButton';
import NDExSignInModal from '../../NDExSignInModal';
import NDExSave from '../../NDExSave';
import OpenOriginalNetworkButton from './OpenOriginalNetworkButton';
import LayoutSelector from './LayoutSelector';
import { camelCaseToTitleCase } from '../TableBrowser/camel-case-util';
import { findAttributes, getNetworkAttributes } from '../TableBrowser/attribute-util';

import NetworkProperties from '../TableBrowser/NetworkProperties';

const styles = (theme) => ({
  toolbar: {
    background: '#EFEFEF',
    height: '4em',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0.5em',
    paddingRight: '0.5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    cursor: 'pointer',
    overflowX: 'clip'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  buttonIcon: {
    height: '2.5em',
    paddingLeft: '0.5em',
  },
  buttons: {
    padding: '0.3em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: 'solid 1px #999999',
  },
  openIcon: {
    marginRight: '0.5em',
  },
});

const NetworkToolbar = (props) => {
  const { classes, ...other } = props;

  let [prefix, name] = ['', ''];

  if (props.search.actualResults.length !== 0) {
    [prefix, name] = props.network.networkName.replace(':', '&').split('&');
  }

  const [layout, setLayout] = useState(props.uiState.layout);

  const [showNetworkInfo, setShowNetworkInfo] = useState(false)

  //Check if pathway figure is valid
  const [tab, setTab] = useState(props.uiState.pathwayFigure ? 0 : 1);
  useEffect(() => {
    props.uiStateActions.setPathwayFigureSource('loading');
    if (tab === 0) {
      const { originalCX } = props.network;
      if (originalCX !== null) {
        const networkAttr = findAttributes(originalCX, 'networkAttributes');
        let figureSource;
        for (let attr of networkAttr) {
          if (attr['n'] === '__NetworkImage') {
            figureSource = attr['v'];
            break;
          }
        }
        if (figureSource == null) {
          //props.uiStateActions.setPathwayFigureSource(null);
          handleTabChange(null, 1);
        } else {
          //Check if image is valid
          const request = new XMLHttpRequest();
          request.open('HEAD', figureSource, true);
          request.send();
          request.onreadystatechange = function() {
            if (
              request.status === 0 ||
              (request.status >= 200 && request.status < 400)
            ) {
              props.uiStateActions.setPathwayFigureSource(figureSource);
            } else {
              props.uiStateActions.setPathwayFigureSource(null);
              handleTabChange(null, 1);
            }
          };
        }
      }
    }
  }, [props.network.originalCX]);

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
    props.uiStateActions.setLayout(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    if (newValue !== tab) {
      setTab(newValue);
      if (newValue === 0) {
        props.uiStateActions.setPathwayFigure(true);
      } else {
        props.uiStateActions.setPathwayFigure(false);
      }
    }
  };

  useEffect(() => {
    if (props.uiState.pathwayFigure) {
      setTab(0);
    } else {
      setTab(1);
    }
  }, [props.uiState.pathwayFigure]);

  useEffect(() => {
    setLayout(props.uiState.layout);
  }, [props.uiState.layout]);

  let networkInfoDialog = null;
  

  return (
    <>
      <div>
        <div className={classes.toolbar}>
          <Tooltip
            title={
              name
                ? camelCaseToTitleCase(prefix) + ':' + name
                : props.network.networkName
            }
          >
            <Link 
              className={classes.title} 
              component="button" 
              variant="body2" 
              onClick={() => props.networkActions.setShowTableModal(true)}
            >
              <Typography
                className={classes.title}
                variant='subtitle1'
                color='inherit'
                noWrap
              >
                {name
                  ? camelCaseToTitleCase(prefix) + ':' + name
                  : props.network.networkName}
              </Typography>
            </Link>
          </Tooltip>
          <div className={classes.grow} />
          {props.uiState.selectedSource !== 'pathwayfigures' ||
          props.uiState.pathwayFigure === false ? (
            <>
              <LayoutSelector
                value={layout}
                handleChange={handleLayoutChange}
                {...other}
              />
              <ResetZoomButton {...other} />
              <Highlighter {...other} />
            </>
          ) : (
            <ResetPathwayFigureZoomButton {...other} />
          )}

          <NDExSignInModal {...other}>
            <NDExSave {...other} />
          </NDExSignInModal>
          { props.uiState.hideViewSourceInNdexButton ? null : <OpenOriginalNetworkButton {...other} /> } 
          <OpenInCytoscapeButton {...other} />
          { props.uiState.hideSaveToNdexButton ? null :  <SaveToNDExButton {...other} />}
        </div>
        <div>
          {props.uiState.selectedSource === 'pathwayfigures' ? (
            <Tabs
              value={tab}
              onChange={handleTabChange}
              className={classes.root}
              style={{ minHeight: 0 }}
            >
              <HoverTab
                key='pathway-figure-tab'
                label='Figure'
                minheight={0}
                height='2.5em'
              />
              <HoverTab
                key='network-tab'
                label='Gene List'
                minheight={0}
                height='2.5em'
              />
            </Tabs>
          ) : null}
        </div>
      </div>
    </>
  );
};

NetworkToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NetworkToolbar);
