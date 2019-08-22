import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/styles'

import Typography from '@material-ui/core/Typography'

import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


import { ListItem } from '@material-ui/core'

import ReorderList from './ReorderList'
import { isClassExpression } from '@babel/types';

const useStyles = makeStyles(theme => ({
  noPadding: {
    padding: '0',
    width: "100%"
  },
  small: {
    minWidth: '0'
  }
}))

const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      height: 'auto'
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0',
    paddingBottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginBottom: -1,
    minHeight: '35px',
    '&$expanded': {
      minHeight: '35px'
    },
  },
  content: {
    margin: '0',
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles({
  root: {
    padding: '0'
  }
})(MuiExpansionPanelDetails);

const buttonStyle = {
  position: 'relative',
  left: '16px',
  bottom: '0'
}

const buttonListStyle = {
  height: '54px',
}


const SortPanel = props => {
  const classes = useStyles()
  const { uiState, uiStateActions } = props
  
  const handleButtonClick = () => {
    uiStateActions.setSort(true)
  }

  return (
    <ListItem disableGutters={true} className={classes.noPadding}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography 
            variant="subtitle2" 
            color="textSecondary"
          >
            Sort by
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.noPadding}>
            <ListItem disableGutters={true} className={classes.noPadding}>
              <ReorderList 
                uiStateActions={props.uiStateActions}
                uiState={props.uiState}
              />
            </ListItem>
            <ListItem disableGutters={true} className={classes.noPadding} style={buttonListStyle}>
              <Button 
                variant="outlined" 
                color="secondary" 
                style={buttonStyle}
                onClick={handleButtonClick}
              >
                Sort
              </Button>
            </ListItem>
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </ListItem>
  )
}

export default SortPanel
            