import React, { useEffect } from 'react'
import './style.css'

import Split from 'react-split'

import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import { camelCaseToTitleCase } from '../TableBrowser/camel-case-util'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'
import { Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import QueryGeneList from '../../QueryGeneList'

import { checkFirstTimeVisitor, getTourDisabled } from '../../Tour/check-visitor'

const titleStyle = {
  lineHeight: '22px',
  wordBreak: 'break-word'
}

const subtitleStyle = {
  height: '22px',
  fontSize: '1.25em',

  wordBreak: 'break-word',
}

const infoStyle = {
  display: 'block',
  margin: '0',
  padding: '0'
}

const edgeStyle = {
  display: 'block',
  height: '22px',
  margin: '0',
  padding: '0',
  position: 'relative',
  top: '22px'
}

const tableStyle = {
  tableLayout: 'fixed',
  wordBreak: 'breakWord',
  borderCollapse: 'collapse',
  borderSpacing: '0'
}


/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => {
  const handleFetch = (networkUUID, networkName, nodeCount, edgeCount, hitGenes, legendUrl) => {
    //checkCytoscapeConnection(props)
    const geneList = props.search.queryList
    const sourceUUID = props.sourceUUID
    const id = props.jobId

    // Reset selection
    props.searchActions.clearSelectedGenes()
    props.networkActions.networkFetchStarted({
      id,
      sourceUUID,
      networkUUID,
      networkName,
      geneList,
      hitGenes,
      nodeCount,
      edgeCount,
      legendUrl
    })
    // reset pathway figure tab when switching to a new
    // network
    props.uiStateActions.setPathwayFigureTab(0);
    props.uiStateActions.setPathwayFigure(true);
    updateHistory(networkUUID)
  }

  // Check first time visitor
  useEffect(() => {
    const userDisabledTour = getTourDisabled();
    if (checkFirstTimeVisitor() && !userDisabledTour) {
      props.uiStateActions.setShowTour(true)
    }
  }, [])
  

  const updateHistory = networkUUID => {
    // Update URL
    const jobId = props.jobId
    const searchResults = props.search.searchResults
    const sourceName = props.uiState.selectedSource

    if (searchResults !== undefined && searchResults !== null) {
      console.log('** network changed:', jobId, sourceName)
      props.history.push(`/${jobId}/${sourceName}/${networkUUID}`)
    }
  }

  const handleImportNetwork = () => {
    // Reset the UI state (hilight)
    props.cyrestActions.importNetworkStarted({
      cx: props.network.originalCX,
      source: props.network.sourceId,
      uuid: props.network.uuid
    })
  }

  const renderNetworkListItem = (querySize, networkEntry, classes, handleListItemClick, selectedIndex, index) => {
    if(props.uiState.selectedSource === 'protein-interactions') {
      return (
        <ProteinInteractionsListItem
          key={networkEntry?.networkUUID} 
          {...props} 
          networkEntry={networkEntry} 
          handleListItemClick={handleListItemClick} 
          selectedIndex={selectedIndex} 
          index={index} 
        />
      )
    }
    return (
      <EnrichmentListItem 
        key={networkEntry?.networkUUID} 
        {...props} 
        networkEntry={networkEntry} 
        handleListItemClick={handleListItemClick} 
        selectedIndex={selectedIndex} 
        index={index} 
      />
    );
  }

  const ProteinInteractionsListItem = (props) => {
    const {networkEntry, results, handleListItemClick, selectedIndex, index} = props;
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes,
      details,
      url,
      totalGeneCount = '?',
      legendURL
    } = networkEntry

    const sourceName = description.split(':')[0] || 'NDEx';

    const icon = (
      <ListItemIcon style={{ width: '5px' }}>
        <Tooltip placement="bottom" title={`Pathway source: ${sourceName}`}>
          <img className="list-icon" src={imageURL} alt="list icon" />
        </Tooltip>
      </ListItemIcon>
    )

    const newline = <Typography>{'\n'}</Typography>

    const title = <Typography variant='body2'style={titleStyle}>{description}</Typography>


    const overlap = (
      <span style={{...subtitleStyle, width: '130px', marginRight: '10px'}}>
        <Typography variant="caption" color="textSecondary">
          <Typography 
            style={{fontWeight: 'bold', fontSize: '1.25em'}} 
            variant="caption" 
            color="secondary">
              {hitGenes.length}
          </Typography>
          <span style={{
            color: props.uiState.sortBy === 'Overlap' ? 'black' : null,
          }}>
              { ` / ${props.search?.searchResults?.validatedGenes?.queryGenes.length} unique genes`}
            </span>
        </Typography>
      </span>
    )

    return (
      <ListItem
        button
        key={networkUUID}
        onClick={event => {
          if (selectedIndex !== index) {
            handleFetch(networkUUID, description, nodes, edges, hitGenes)
            handleListItemClick(event, index, legendURL)
            if (url != null) {
              props.networkActions.setOriginalNetworkUrl('https://' + url)
            }
          }
        }}
        selected={selectedIndex === index}
      >
      <table style={tableStyle}>
        <tbody>
          <tr padding="0">
            <td align="center" valign="middle" rowSpan="2" padding="0">
              {icon}
            </td>
            <td align="left" padding="0">
              {title}
              {newline}
              <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px'}}>
                {overlap}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
  </ListItem>)

  }

  const EnrichmentListItem = (props) => {
    const {networkEntry, results, handleListItemClick, selectedIndex, index} = props;
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes,
      details,
      url,
      totalGeneCount = '?',
      legendURL
    } = networkEntry

    const sourceName = description.split(':')[0] || 'NDEx';

    const icon = (
      <ListItemIcon style={{ width: '5px' }}>
        <Tooltip placement="bottom" title={`Pathway source: ${sourceName}`}>
          <img className="list-icon" src={imageURL} alt="list icon" />
        </Tooltip>
      </ListItemIcon>
    )

    const newline = <Typography>{'\n'}</Typography>

    let pVal = details.PValue
    if (pVal != null) {
      pVal = pVal.toExponential(2)
    }

    const pv = (
      <div style={{...subtitleStyle, marginRight: '10px', width: '120px',}}>
        <Typography
          variant="caption"
          display="inline"
          color={'textSecondary'}
        >
          {`p-Value: `}
        </Typography>
        <Typography 
          style={{fontWeight: 'bold' }} 
          variant="caption" 
          display="inline" 
          color={ props.uiState.sortBy === 'p-Value' ? 'textPrimary' : 'textSecondary'}>
          {`${pVal}`}
        </Typography>
      </div>
    )

    let similarity
    let sim = details.similarity
    if (sim !== undefined) {
      if (isNaN(sim)) {
        sim = 'NaN'
      } else {
        sim = sim.toFixed(2)
      }
      similarity = (
        <div style={{...subtitleStyle, marginRight: '10px', width: '110px',}}>
        <Typography
          variant="caption"
          display="inline"
          color={'textSecondary'}
        >
          {`Similarity: `}
        </Typography>
        <Typography 
          style={{fontWeight: 'bold' }} 
          variant="caption" 
          display="inline" 
          color={ props.uiState.sortBy === 'Similarity' ? 'textPrimary' : 'textSecondary'}>
          {`${sim}`}
        </Typography>
      </div>
      )
    } else {
      similarity = null
    }

    const title = <Typography variant='body2'style={titleStyle}>{description.split(':').slice(1)}</Typography>

    const overlap = (
      <span style={{...subtitleStyle, width: '150px', overlfow: 'visible', marginRight: '10px'}}>
        <Typography variant="caption" color="textSecondary">
          <Typography 
            style={{fontWeight: 'bold', fontSize: '1.25em'}} 
            variant="caption" 
            color="secondary">
              {hitGenes.length}
          </Typography>
          <span style={{
            color: props.uiState.sortBy === 'Overlap' ? 'black' : null,
            fontWeight: props.uiState.sortBy == 'Overlap'? 'bold' : null
          }}>
              { ` / ${totalGeneCount} unique genes`}
            </span>
        </Typography>
      </span>
    )

    const sortValueDisplay = {
      'p-Value': pv,
      'Overlap': null,
      'Similarity': similarity
    };

    return (
      <ListItem
        button
        key={networkUUID}
        onClick={event => {
          if (selectedIndex !== index) {
            handleFetch(networkUUID, description, nodes, edges, hitGenes)
            handleListItemClick(event, index, legendURL)
            if (url != null) {
              props.networkActions.setOriginalNetworkUrl('https://' + url)
            }
          }
        }}
        selected={selectedIndex === index}
      >
          <table style={tableStyle}>
            <tbody>
              <tr padding="0">
                <td align="center" valign="middle" rowSpan="2" padding="0">
                  {icon}
                </td>
                <td align="left" padding="0">
                  {title}
                  {newline}
                  <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginBottom: '10px'}}>
                    {overlap}
                    {similarity}
                    {pv}
                  </div>
                </td>
              </tr>
              <tr style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
                <td style={{ display: 'flex', alignItems: 'center' }}>
                  {selectedIndex !== index ? 
                    <Typography variant="caption" color="secondary" >
                      { hitGenes.length > 5 ? `${hitGenes.sort().slice(0, 5).join(' ')}...` : hitGenes.sort().slice(0, 5).join(' ') }
                    </Typography>
                  : null}
                </td>
                {selectedIndex === index ? <QueryGeneList {...props} /> : null}
              </tr>
            </tbody>
          </table>
      </ListItem>
    )
  }

  const { hideSearchBar } = props.uiState;

  return (
    <Split sizes={[40, 60]} gutterSize={4} className={ hideSearchBar ? 'headerless-ndex-base' : "ndex-base" } >
      <NetworkList
        renderNetworkListItem={renderNetworkListItem}
        handleFetch={handleFetch}
        hits={props.hits}
        totalNetworks={props.totalNetworks}
        {...props}
      />
      <NetworkView handleImportNetwork={handleImportNetwork} {...props} />
    </Split>
  )
}

export default Ndex
