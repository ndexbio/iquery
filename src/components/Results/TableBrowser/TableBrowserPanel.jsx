import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import HoverTab from '../HoverTab';
import { makeStyles } from '@material-ui/styles';

import { findAttributes } from './attribute-util';

import NetworkProperties from './NetworkProperties';
import MemoNodeProperties from './NodeProperties';
import MemoEdgeProperties from './EdgeProperties';

import ErrorBoundary from '../../ErrorBoundary';

import { mapKeys } from 'lodash';

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

  //Find @context
  let context;
  context = findAttributes(props.network.originalCX, '@context');
  if (context != null) {
    context = context[0];
  } else {
    const networkAttr = findAttributes(
      props.network.originalCX,
      'networkAttributes'
    );
    if (networkAttr != null) {
      for (let i = 0; i < networkAttr.length; i++) {
        if (networkAttr[i].n === '@context') {
          context = JSON.parse(networkAttr[i].v);
        }
      }
    }
  }
  //Uppercase all keys in context
  const contextUpper = mapKeys(context, function(v, k) {
    return k.toUpperCase();
  });

  //Find lists and attributes
  let nodeList;
  let nodeAttributes;
  let edgeAttributes;
  for (let i = 0; i < props.network.originalCX.length; i++) {
    if (props.network.originalCX[i].nodes != null) {
      nodeList = props.network.originalCX[i].nodes;
      if (nodeAttributes != null && edgeAttributes != null) {
        break;
      }
    }
    if (props.network.originalCX[i].nodeAttributes != null) {
      nodeAttributes = props.network.originalCX[i].nodeAttributes;
      if (nodeList != null && edgeAttributes != null) {
        break;
      }
    }
    if (props.network.originalCX[i].edgeAttributes != null) {
      edgeAttributes = props.network.originalCX[i].edgeAttributes;
      if (nodeList != null && nodeAttributes != null) {
        break;
      }
    }
  }

  // Find node related properties
  const represents = {};
  const nodeListProperties = {}; //Dictionary { property name : dictionary { gene name : list of properties }}
  if (nodeList != null) {
    //Find represents
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].r != null) {
        represents[nodeList[i].n] = nodeList[i].r;
      }
    }
    //Find node properties that are lists
    if (nodeAttributes != null) {
      for (let i = 0; i < nodeAttributes.length; i++) {
        if (nodeAttributes[i].d === 'list_of_string') {
          let propDict = {};
          if (nodeListProperties[nodeAttributes[i].n] != null) {
            propDict = nodeListProperties[nodeAttributes[i].n];
          }
          const geneName = nodeList.filter(
            (node) => node['@id'] === nodeAttributes[i].po
          )[0].n;
          if (geneName != null) {
            if (propDict[geneName] == null) {
              propDict[geneName] = nodeAttributes[i].v;
            } else {
              propDict[geneName] = propDict[geneName].concat(
                nodeAttributes[i].v
              );
            }
          }
          nodeListProperties[nodeAttributes[i].n] = propDict;
        }
      }
    }
  }

  //Find edge properties that are lists
  const edgeListProperties = {};
  if (edgeAttributes != null) {
    for (let i = 0; i < edgeAttributes.length; i++) {
      if (edgeAttributes[i].d === 'list_of_string') {
        let propDict = {};
        if (edgeListProperties[edgeAttributes[i].n] != null) {
          propDict = edgeListProperties[edgeAttributes[i].n];
        }
        const edgeId = edgeAttributes[i].po;
        if (propDict[edgeId] == null) {
          propDict[edgeId] = edgeAttributes[i].v;
        } else {
          propDict[edgeId] = propDict[edgeId].concat(edgeAttributes[i].v);
        }
        edgeListProperties[edgeAttributes[i].n] = propDict;
      }
    }
  }

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
    <div className='table-browser-panel'>
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
      <ErrorBoundary message={'There was an error loading tab content.'}>
        <TabContent value={value} {...props} />
      </ErrorBoundary>
    </div>
  );
};

export default TableBrowserPanel;
