import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import HoverTab from '../HoverTab';
import { makeStyles } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { getNetworkAttributes, getNetworkElementAttributes } from './attribute-util';

import NetworkProperties from './NetworkProperties';
import MemoNodeProperties from './NodeProperties';
import MemoEdgeProperties from './EdgeProperties';

import ErrorBoundary from '../../ErrorBoundary';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: '0.2em',
    backgroundColor: '#FFFFFF',
    overflow: 'auto',
  },
  list: {},
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em',
  },
  root: {
    minHeight: 0,
  },
}));

const backgroundcolor = 'rgb(220, 220, 220)';

const TabContent = (props) => {
  const { value } = props;
  const context = getNetworkAttributes(props.network.originalCX);
  const {
    nodeListProperties,
    edgeListProperties,
    contextUpper,
    represents,
    nodeList
  } = getNetworkElementAttributes(props.network.originalCX);
  

  if (value === 0) {
    return <NetworkProperties context={context} {...props} />;
  } else if (value === 1) {
    return (
      <MemoNodeProperties
        context={contextUpper}
        represents={represents}
        listProperties={nodeListProperties}
        {...props}
      />
    );
  } else {
    return (
      <MemoEdgeProperties
        context={contextUpper}
        nodeList={nodeList}
        listProperties={edgeListProperties}
        {...props}
      />
    );
  }
};

const DISABLED_STYLE = {
  width: '100%',
};

const TableBrowserPanel = (props) => {
  //const network = props.network
  const classes = useStyles();
  const value = props.network.tableDisplayTab;
  const originalCX = props.network.originalCX;
  if (originalCX === null) {
    return <div style={DISABLED_STYLE} />;
  }

  function handleChange(event, newValue) {
    props.networkActions.changeTab(newValue);
  }

  //Get current tab selection
  return (
    <ErrorBoundary message={'Sorry, there was an error loading tab content.'}>
      <div className='table-browser-panel'>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Tabs value={value} onChange={handleChange} className={classes.root}>
            <HoverTab
              className={classes.root}
              key={'network-tab'}
              label={'Network'}
              backgroundcolor={backgroundcolor}
            />
            <HoverTab
              className={classes.root}
              key={'nodes-tab'}
              label={'Nodes'}
              backgroundcolor={backgroundcolor}
            />
            <HoverTab
              className={classes.root}
              key={'edges-tab'}
              label={'Edges'}
              backgroundcolor={backgroundcolor}
            />
          </Tabs>
          <IconButton onClick={() => props.networkActions.setShowTableModal(false)} aria-label="close">
           <CloseIcon/>
          </IconButton>

        </div>
          <TabContent value={value} {...props} />
      </div>
    </ErrorBoundary>
  );
};

export default TableBrowserPanel;
