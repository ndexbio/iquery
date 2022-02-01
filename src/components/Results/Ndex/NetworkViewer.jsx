import React from 'react';
import './style.css';
import CytoscapeViewer from '../CytoscapeViewer';
import ErrorBoundary from '../../ErrorBoundary';
import LoadingPanel from '../../LoadingPanel';
import Warning from '../CytoscapeViewer/Warning';
import PathwayFigureViewer from './PathwayFigureViewer';
import { MAX_NETWORK_SIZE } from '../../../api/config';

const NetworkViewer = (props) => {
  if (props.network.isFetching) {
    return (
      <div className='network-view'>
        <LoadingPanel title='Loading Network...' color='#FFFFFF' />
      </div>
    );
  } else if (props.search.actualResults.length === 0) {
    return <div className='network-view' />;
  } else if (
    props.network.nodeCount + props.network.edgeCount >
    MAX_NETWORK_SIZE
  ) {
    return (
      <div className='network-view'>
        <Warning {...props} />
      </div>
    );
  } else if (props.uiState.selectedSource === 'pathwayfigures') {
    return (
      <div className='network-view'>
        {props.uiState.pathwayFigure ? (
          <PathwayFigureViewer {...props} />
        ) : (
          <ErrorBoundary message={'Sorry, there was an error loading this network.'}>
            <CytoscapeViewer resized={props.resized} {...props} />
          </ErrorBoundary>
        )}
      </div>
    );
  } else {
    return (
      <div className='network-view'>
          <ErrorBoundary message={'Sorry, there was an error loading this network.'}>
          <CytoscapeViewer resized={props.resized} {...props} />
        </ErrorBoundary>
      </div>
    );
  }
};

export default NetworkViewer;
