import './style.css';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info'
import { Container, Box } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import Linkify from 'linkify-react';
import parse from 'html-react-parser';

import { formatPrimary } from '../TableBrowser/NetworkProperties';
import {Tooltip} from '@material-ui/core';

import NDExQueryHelpDialog from './NDExQueryHelpDialog';

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

  const [queryType, setQueryType] = useState('direct')
  const [showQueryHelper, setShowQueryHelper] = useState(false)

  const handleChange = (e) => {
    setQueryType(e.target.value)
  }

  const networkInfo = props.search.actualResults.find(r => r.networkUUID === props.network.uuid)
  const reference = networkInfo?.reference || '';
  const description = networkInfo?.detailedDescription || '';

  const handleProteinInteractionsSearch = () => {
    const url = `https://dev.ndexbio.org/viewer/networks/${props.network.uuid}?query=${props.search.searchResults.validatedGenes.queryGenes.join(' ')}&queryType=${queryType}&maximizeResultView=true`;
    window.open(url, '_blank');
  }
  return (
    <div>
      <div style={{height: 'calc(100% - 75px)', padding: '10px', paddingTop: '0px'}}>
        <div style={{marginTop: '10px', height: 'inherit', overflow: 'scroll'}}>
            <Typography style={{marginTop: '8px'}} variant="caption" color="textSecondary">Reference</Typography>
            <Typography variant="body2">
              <Linkify>
                {formatPrimary(reference)}
              </Linkify>
            </Typography>
            <Typography style={{marginTop: '10px'}} component="div" variant="caption" color="textSecondary">Description</Typography>
            <Typography variant="body2" component="div">
              <Linkify>
                  {formatPrimary(description)}
              </Linkify>
            </Typography>
        </div>
      </div>
      <div style={{    
        position: 'sticky',
        bottom: 0,
        width: 'inherit',
        borderTop: '1px solid #D6D5D6',
        height: '120px',
        overflow: 'hidden'
      }}>
        <Typography variant="body2" style={{padding: '10px', overflow: 'hidden', height: '35px'}}>
            Select the type of the Neighborhood Query you wish to run using the dropdown menu below, then click the magnifier to run.
            The query result will be opened in NDEx.
        </Typography>
        <div style={{backgroundColor: '#F5F5F5', height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div style={{color: '#f9880e', height: '20px', overflow: 'hidden', flexShrink: 10}}>Click the info icon for details about the available types of queries.</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <IconButton onClick={e => setShowQueryHelper(true)}>
                <InfoIcon style={{color: '#3576BE', flexShrink: 20}}></InfoIcon>
              </IconButton>
                <Select
                  style={{width: '180px', flexShrink: 20}}
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={queryType}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="direct">Direct</MenuItem>
                  <MenuItem value={'firstStepNeighborhood'}>1-Step Neighborhood</MenuItem>
                  <MenuItem value={'firstStepAdjacent'}>1-Step adjacent</MenuItem>
                  <MenuItem value={'interconnect'}>Interconnect</MenuItem>
                  <MenuItem value={'twoStepNeighborhood'}>2-step neighborhood</MenuItem>
                  <MenuItem value={'twoStepAdjacent'}>2-step adjacent</MenuItem>

                </Select>
                <Tooltip title={`Run ${queryType} query`}>
                  <IconButton
                      style={{flexShrink: 1, minWidth: '25px'}}
                      onClick={handleProteinInteractionsSearch}
                      color='inherit'>
                    <SearchIcon />
                  </IconButton>                  

                
                </Tooltip>
            </div>
          </div>
          <NDExQueryHelpDialog onClose={e => setShowQueryHelper(false)} open={showQueryHelper} />

      </div>
    </div>
  );
};

ProteinInteractionsWidget.propTypes = {
};

export default withStyles(styles)(ProteinInteractionsWidget);
