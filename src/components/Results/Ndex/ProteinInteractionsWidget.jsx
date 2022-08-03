import './style.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const styles = (theme) => ({
  toolbar: {
    background: 'rgba(0, 0, 0, 0.08)',
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
});

const ProteinInteractionsWidget = (props) => {

  return (
      <div>
        <div>
            <Typography variant="caption">Description</Typography>
            <Typography variant="body2">network description that is pulled from a config.</Typography>
            <Typography variant="caption">Reference</Typography>
            <Typography variant="body2">reference content for the network that is pulled from a config.</Typography>
        </div>
            <Divider/>
        <div>
            <Typography variant="body2">
                Select the type of the Neighborhood Query you wish to execute using the dropdown menu below, then click the magnifier to run.
            </Typography>
            <Typography variant="body2">
                <span>Click the </span><SearchIcon/><span>info icon for more details about the available types of query.</span>
            </Typography>    
            <Typography variant="body2">
                Query results will open in a new tab.
            </Typography>    
        </div>
      </div>
  );
};

ProteinInteractionsWidget.propTypes = {
};

export default withStyles(styles)(ProteinInteractionsWidget);
