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
      <Container fixed>
        <div style={{marginTop: '20px', overflowY: 'scroll'}}>
            <Typography variant="body1" color="textSecondary">Description</Typography>
            <Typography variant="body2">
              <Linkify>
                  {parse(description)}
              </Linkify>
            </Typography>
            <Typography style={{marginTop: '30px'}} variant="body1" color="textSecondary">Reference</Typography>
            <Typography variant="body2">
              <Linkify>
                {parse(reference)}
              </Linkify>
            </Typography>
        </div>
            <Divider style={{marginTop: '20px'}}/>
        <div>
            <Typography variant="body2" style={{marginTop: '20px'}}>
                Select the type of the Neighborhood Query you wish to run using the dropdown menu below, then click the magnifier to run.
                The query result will be opened in NDEx.
            </Typography>
        </div>

        <div style={{backgroundColor: '#F5F5F5', marginTop: '30px', height: '50px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{color: '#f9880e'}}>Click the info icon for details about the available types of query</div>
          </div>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <IconButton onClick={e => setShowQueryHelper(true)}>
              <InfoIcon style={{color: '#3576BE'}}></InfoIcon>
            </IconButton>
              <Select
                style={{minWidth: '200px'}}
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
              <IconButton
                      onClick={handleProteinInteractionsSearch}
                      color='inherit'
                    >
                  <SearchIcon />
              </IconButton>                  

          </div>
        </div>
        <NDExQueryHelpDialog onClose={e => setShowQueryHelper(false)} open={showQueryHelper} />
      </Container>
  );
};

ProteinInteractionsWidget.propTypes = {
};

export default withStyles(styles)(ProteinInteractionsWidget);
