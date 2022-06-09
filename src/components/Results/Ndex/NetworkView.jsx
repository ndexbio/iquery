import React, { useState } from 'react';
import './style.css';
import Split from 'react-split';

import NetworkViewer from './NetworkViewer';
import MemoTableBrowser from '../TableBrowser';
import NetworkToolbar from './NetworkToolbar';

import Dialog from '@material-ui/core/Dialog'
import QueryGeneList from '../../QueryGeneList';

import { ButtonGroup, IconButton } from '@material-ui/core';
import FitIcon from '@material-ui/icons/ZoomOutMap'
import ZoomInIcon from '@material-ui/icons/ZoomIn'
import ZoomOutIcon from '@material-ui/icons/ZoomOut'

const DEFAULT_RATIO = [100, 0];

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const NetworkView = (props) => {
  const [resized, setResize] = useState(null);

  const handleResizeEnd = (e) => {
    setResize(e);
  };

  const { showTableModal } = props.network;

  const handleFit = (evt) => {
    if(props.uiState.selectedSource === 'pathwayfigures') {
      props.uiStateActions.setFitPathwayFigure(true);
    } else {
      props.uiStateActions.fitNetworkView();
    }
  };

  const handleZoomIn = (evt) => {
    if (props.uiState.selectedSource === 'pathwayfigures') {
      props.uiStateActions.setPathwayFigureZoom({
        scale: props.uiState.pathwayFigureZoom.scale * 1.2,
      });
    } else {
      const cy = props.network.cyJsInstance;
      if (cy?._private?.renderer?.isHeadless != null) {
        const currentZoom = cy.zoom()
        const newLevel = currentZoom * 1.2
        cy.zoom(newLevel)
      }  
    }
  }
  const handleZoomOut = (evt) => {
    if (props.uiState.selectedSource === 'pathwayfigures') {
      props.uiStateActions.setPathwayFigureZoom({
        scale: props.uiState.pathwayFigureZoom.scale * 0.8,
      });
    } else {
      const cy = props.network.cyJsInstance;
      if (cy?._private?.renderer?.isHeadless != null) {
        const currentZoom = cy.zoom()
        const newLevel = currentZoom * 0.8
        cy.zoom(newLevel)
      }  
    }
  }

  return (
    <div className={'network-view-top'}>
      <NetworkToolbar {...props} />
      <Dialog 
        fullWidth={true}
        maxWidth={'md'}
        open={showTableModal}
        onClose={() => {
          props.networkActions.changeTab(0); // 0 for network info
          props.networkActions.setShowTableModal(false);
          props.networkActions.unselectNodes();
          props.networkActions.unselectEdges();
        }}
      >
        <MemoTableBrowser {...props} />
      </Dialog>
      <Split
        sizes={DEFAULT_RATIO}
        direction='vertical'
        gutterSize={7}
        className={'nv-container'}
        onDragEnd={handleResizeEnd}
        style={
          props.uiState.selectedSource === 'pathwayfigures'
            ? { top: '6.5em' }
            : null
        }
      >
        <div style={{display: 'flex'}}>
          <NetworkViewer resized={resized} {...props} />      
          { props.network.isFetching ? null : 
          <div style={{position: 'absolute', bottom: '1em', left: '1em'}}>
            <ButtonGroup
              // className={classes.root}
              style={{border: '1px solid #DDDDDD', backgroundColor: 'white', opacity: 1}}
              orientation="vertical"
              color="secondary"
              variant="outlined"
            >
              <IconButton
                key={'fitButton'}
                color={'primary'}
                style={{ backgroundColor: 'transparent' }}
                onClick={handleFit}
              >
                <FitIcon />
              </IconButton>
              <IconButton
                key={'zoomInButton'}
                color={'primary'}
                style={{ backgroundColor: 'transparent' }}
                onClick={handleZoomIn}
              >
                <ZoomInIcon />
              </IconButton>
              <IconButton
                key={'zoomOutButton'}
                color={'primary'}
                style={{ backgroundColor: 'transparent' }}
                onClick={handleZoomOut}
              >
                <ZoomOutIcon />
              </IconButton>
            </ButtonGroup>
          </div>  
          }
        </div>
      </Split>
    </div>
  );
};

export default NetworkView;
