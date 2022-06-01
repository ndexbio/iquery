import React, { useState } from 'react';
import './style.css';
import Split from 'react-split';

import NetworkViewer from './NetworkViewer';
import MemoTableBrowser from '../TableBrowser';
import NetworkToolbar from './NetworkToolbar';

import Dialog from '@material-ui/core/Dialog'
import QueryGeneList from '../../QueryGeneList';
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
        </div>
      </Split>
    </div>
  );
};

export default NetworkView;
