import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClipboardIcon from '@material-ui/icons/AssignmentOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { Typography } from '@material-ui/core';
import MessageSnackbar from './MessageSnackbar';

import { NormalizedGeneTypography, InvalidGeneTypography } from '../GeneList';

import { GENESET_EXAMPLES } from '../../api/config';

import dnaIcon from '../../assets/images/dna_gray.svg';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0em 0.3em',
    background: '#f1f1f1',
    marginLeft: '1em',
  },
  input: {
    marginLeft: 8,
    flex: 1,
    width: '50vw',
  },
  iconButton: {
    padding: 10,
    height: '1em',
    width: '1em'
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
  fullQueryContainer: {
    width: '50vw',
    padding: 10,
    backgroundColor: '#F1F1F1'
  }
};

const ORIGINAL_GENE_TEXT = 'original-gene-text';

const GeneTextBox = (props) => {
  const { classes } = props;
  const geneTextRef = useRef();

  const { queryGenes, invalid, normalizedGenes } = props.search.searchResults.validatedGenes

  const [state, setState] = useState({
    anchorEl: null,
    query: [...queryGenes, ...invalid].join(' '),
  });
  const [open, setOpen] = useState(false);

  const [queryPopperEl, setQueryPopperEl] = React.useState(null);

  const showQueryPopper = (event) => {
    console.log(geneTextRef.current);
    setQueryPopperEl(geneTextRef.current);
  };

  const closeQueryPopper = () => {
    setQueryPopperEl(null);
  };

  const popperOpen = Boolean(queryPopperEl);
  const popperId = popperOpen ? 'query-popper' : undefined;


  const menuOpen = Boolean(state.anchorEl);

  // useEffect(() => {
  //   loadCSS(
  //     'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
  //     document.querySelector('#insertion-point-jss')
  //   );
  //   return () => {};
  // }, []);

  const handleCopy = () => {
    // This is a hack...
    const copyText = document.getElementById(ORIGINAL_GENE_TEXT);
    copyText.select();
    document.execCommand('copy');

    // Show message
    setOpen(true);
  };

  const handleSearch = (event, query) => {
    let genes;
    if (query == null) {
      genes = state.query;
    } else {
      genes = query;
    }

    // If sources are not found, searchActions.searchStarted will send a request to find them
    // refs UD-2219
    const sources = props.source.sources || [];

    if (genes.length === 0) {
      // TODO: add better error message
      return;
    }

    const sourceNames = sources.map((source) => source.name);
    const geneList = genes.split(/\s*,\s*|\s*;\s*|\s+/);

    props.uiStateActions.setSelectedSource('enrichment');
    props.searchActions.clearAll();
    props.history.push('/');
    props.searchActions.setQuery(genes);
    props.searchActions.searchStarted({ geneList, sourceNames, validateGenesWithMyGene: props.search.validateGenesWithMyGene });
  };

  const handleChange = (name) => (event) => {
    setState({
      ...props,
      [name]: event.target.value,
    });
  };

  const handleClear = () => {
    setState({ ...state, query: '' });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMenu = (event) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };

  const handleExample = (exampleIdx) => {
    setState({
      ...props,
      query: GENESET_EXAMPLES[exampleIdx].genes,
      anchorEl: null,
    });
    handleSearch(null, GENESET_EXAMPLES[exampleIdx].genes);
  };

  const createGeneInfo = gene => {
    const isValid = queryGenes.includes(gene)
    const isNormalized = normalizedGenes[gene] != null;

    return {
      gene,
      isValid,
      alias: isNormalized ? normalizedGenes[gene] : null
    }
  };

  const validGeneText = ({gene, alias}) => {
    return <Typography variant="body2" 
    color={"default"}
    >
      {gene}
    </Typography>  
  }

  const normalizedGeneText = ({gene, alias}) => {
   return <Tooltip title={`This query gene was normalized. Original query term: ${alias}`}>
    <NormalizedGeneTypography variant="body2">
      {gene}
    </NormalizedGeneTypography>
  </Tooltip>
  }

  const invalidGeneText = ({gene, alias}) => {
    return <Tooltip title={`Not a valid human gene: ${gene}`}>
     <InvalidGeneTypography variant="body2">
       {gene}
     </InvalidGeneTypography>
   </Tooltip>
   }
  
   const queryTokens =  [...queryGenes, ...invalid];


  return (
    <div>
      <MessageSnackbar
        open={open}
        setOpen={setOpen}
        message={'Genes are copied to clipboard!'}
        autoHideDuration={4000}
        horizontal={'left'}
        vertical={'bottom'}
      />
      <Paper className={classes.root} elevation={0}>
        <Tooltip title='Query gene set examples' placement='bottom'>
          <div>
            <IconButton
              className={classes.iconButton}
              aria-label='Menu'
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={menuOpen}
              onClose={handleClose}
            >
              {GENESET_EXAMPLES.map((example, idx) => {
                if (example.name !== 'Estrogen') {
                  return (
                    <MenuItem key={idx} onClick={() => handleExample(idx)}>
                      {example.name}
                    </MenuItem>
                  );
                } else {
                  return null;
                }
              })}
            </Menu>
          </div>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title='Copy' placement='bottom'>
          <IconButton
            color='default'
            className={classes.iconButton}
            aria-label='Copy'
            onClick={handleCopy}
          >
            <ClipboardIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title='Clear gene list' placement='bottom'>
          <IconButton
            color='default'
            className={classes.iconButton}
            aria-label='Clear'
            onClick={handleClear}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title='View my query' placement='bottom'>
          <IconButton
            aria-describedby={popperId}
            color='default'
            className={classes.iconButton}
            aria-label='Clear'
            onClick={showQueryPopper}
          >
            <img
              alt="DNA icon"
              src={dnaIcon}
              style={{
                height: '1em',
                width: '1em'
              }}
            />
          </IconButton>
        </Tooltip>
        <Popover
          id={popperId}
          open={popperOpen}
          anchorEl={queryPopperEl}
          onClose={closeQueryPopper}
          anchorReference='anchorEl'
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'start',
          }}
        >
          <Paper className={classes.fullQueryContainer}>
            <Typography>
              <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {queryTokens.map(createGeneInfo).map(({gene, isValid, alias}) => {
                  const isNormalized = alias != null
                  return <div key={gene} style={{paddingRight: '10px', width: '80px'}}>
                    {!isValid ? invalidGeneText({gene, alias}) : isNormalized ?  normalizedGeneText({gene, alias}) : validGeneText({gene, alias})  }
                  </div> 
                })}
              </div>
            </Typography>
          </Paper>
        </Popover>
        <Divider className={classes.divider} />
        <InputBase
          id={ORIGINAL_GENE_TEXT}
          className={classes.input}
          placeholder='Enter gene list (or click menu for examples)'
          value={state.query}
          onChange={handleChange('query')}
          onKeyDown={handleKeyPress}
          ref={geneTextRef}
        />

        <Divider className={classes.divider} />

        <Tooltip title='Start new search' placement='bottom'>
          <IconButton
            color='primary'
            className={classes.iconButton}
            aria-label='Directions'
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(GeneTextBox);
