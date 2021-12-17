import React from 'react'
import './style.css'

import Split from 'react-split'

import NetworkView from './NetworkView'
import NetworkList from './NetworkList'

import { camelCaseToTitleCase } from '../TableBrowser/camel-case-util'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import Typography from '@material-ui/core/Typography'
import { ListItem } from '@material-ui/core'

const titleStyle = {
  lineHeight: '22px',
  wordBreak: 'break-word'
}

const subtitleStyle = {
  height: '22px',
  lineHeight: '22px',
  wordBreak: 'break-word'
}

const infoStyle = {
  display: 'block',
  height: '22px',
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
  const handleFetch = (networkUUID, networkName, nodeCount, edgeCount, hitGenes) => {
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
      edgeCount
    })
    updateHistory(networkUUID)
  }

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
    if (props.uiState.selectedSource === 'enrichment') {
      return renderNetworkListItemEnrichment(networkEntry, handleListItemClick, selectedIndex, index)
    } else if (props.uiState.selectedSource.startsWith('interactome')) {
      return renderNetworkListItemInteractome(networkEntry, handleListItemClick, selectedIndex, index)
    } else {
      return renderNetworkListItemDefault(networkEntry, handleListItemClick, selectedIndex, index)
    }
  }

  const renderNetworkListItemEnrichment = (networkEntry, handleListItemClick, selectedIndex, index) => {
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes,
      details,
      url,
      totalGeneCount = '?'
    } = networkEntry
    const genes = (
      <span style={infoStyle}>
        <Typography display="inline" color={props.uiState.sortBy !== 'Overlap' ? 'textSecondary' : 'textPrimary'}>
          <strong>{hitGenes.length}</strong>{' '}
        </Typography>
        <Typography
          variant="caption"
          display="inline"
          color={props.uiState.sortBy === 'Overlap' ? 'textPrimary' : 'textSecondary'}
        >
          genes
        </Typography>
      </span>
    )

    const icon = (
      <ListItemIcon style={{ width: '20px' }}>
        <img className="list-icon" src={imageURL} alt="list icon" />
      </ListItemIcon>
    )

    const newline = <Typography>{'\n'}</Typography>

    let pVal = details.PValue
    if (pVal != null) {
      const networkCount = details.totalNetworkCount
      const threshold = Math.pow(10, Math.ceil(Math.log(1e-16 * networkCount) / Math.LN10))
      if (pVal < threshold) {
        pVal = '< ' + threshold
      } else if (pVal > 1) {
        pVal = '~ 1'
      } else {
        pVal = pVal.toExponential(2)
      }
    }

    const pv = (
      <span style={infoStyle}>
        <Typography display="inline" color={props.uiState.sortBy === 'p-Value' ? 'textPrimary' : 'textSecondary'}>
          <strong>{pVal} </strong>
        </Typography>
        <Typography
          variant="caption"
          display="inline"
          color={props.uiState.sortBy === 'p-Value' ? 'textPrimary' : 'textSecondary'}
        >
          pv
        </Typography>
      </span>
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
        <span style={infoStyle}>
          <Typography display="inline" color={props.uiState.sortBy === 'Similarity' ? 'textPrimary' : 'textSecondary'}>
            <strong>{sim} </strong>
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            color={props.uiState.sortBy === 'Similarity' ? 'textPrimary' : 'textSecondary'}
          >
            similarity
          </Typography>
        </span>
      )
    } else {
      similarity = null
    }

    const title = <Typography style={titleStyle}>{description.split(':').slice(1)}</Typography>

    const subtitle = (
      <span style={subtitleStyle}>
        <Typography variant="caption" color="textSecondary">
          <span>Nodes: {nodes}, </span>
          <span>Edges: {edges}, </span>
          <span>Total gene count: {totalGeneCount}, </span>
          <span>Source: {camelCaseToTitleCase(description.split(':')[0])}</span>
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
            handleListItemClick(event, index)
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
              <td align="left" valign="baseline" width="100px" padding="0">
                {genes}
                {newline}
                {pv}
                {newline}
                {similarity}
              </td>
              <td align="left" valign="baseline" padding="0">
                {title}
                {newline}
                {subtitle}
              </td>
            </tr>
          </tbody>
        </table>
      </ListItem>
    )
  }

  const renderNetworkListItemInteractome = (networkEntry, handleListItemClick, selectedIndex, index) => {
    const { description, networkUUID, nodes, edges, imageURL, hitGenes, details, url } = networkEntry
    const genes = (
      <span style={infoStyle}>
        <Typography
          display="inline"
          color={
            props.uiState.selectedSource === 'enrichment' && props.uiState.sortBy !== 'Overlap'
              ? 'textSecondary'
              : 'textPrimary'
          }
        >
          <strong>{hitGenes.length}</strong>{' '}
        </Typography>
        <Typography
          variant="caption"
          display="inline"
          color={
            props.uiState.selectedSource === 'enrichment' && props.uiState.sortBy === 'Overlap'
              ? 'textPrimary'
              : 'textSecondary'
          }
        >
          genes
        </Typography>
      </span>
    )

    const icon = (
      <ListItemIcon style={{ width: '20px' }}>
        <img className="list-icon" src={imageURL} alt="list icon" />
      </ListItemIcon>
    )

    const newline = <Typography>{'\n'}</Typography>

    if (props.uiState.selectedSource === 'enrichment') {
      let pVal = details.PValue
      if (pVal != null) {
        const networkCount = details.totalNetworkCount
        const threshold = Math.pow(10, Math.ceil(Math.log(1e-16 * networkCount) / Math.LN10))
        if (pVal < threshold) {
          pVal = '< ' + threshold
        } else if (pVal > 1) {
          pVal = '~ 1'
        } else {
          pVal = pVal.toExponential(2)
        }
      }

      const pv = (
        <span style={infoStyle}>
          <Typography display="inline" color={props.uiState.sortBy === 'p-Value' ? 'textPrimary' : 'textSecondary'}>
            <strong>{pVal} </strong>
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            color={props.uiState.sortBy === 'p-Value' ? 'textPrimary' : 'textSecondary'}
          >
            pv
          </Typography>
        </span>
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
          <span style={infoStyle}>
            <Typography
              display="inline"
              color={props.uiState.sortBy === 'Similarity' ? 'textPrimary' : 'textSecondary'}
            >
              <strong>{sim} </strong>
            </Typography>
            <Typography
              variant="caption"
              display="inline"
              color={props.uiState.sortBy === 'Similarity' ? 'textPrimary' : 'textSecondary'}
            >
              similarity
            </Typography>
          </span>
        )
      } else {
        similarity = null
      }

      const title = <Typography style={titleStyle}>{description.split(':').slice(1)}</Typography>

      const subtitle = (
        <span style={subtitleStyle}>
          <Typography variant="caption" color="textSecondary">
            <span>Nodes: {nodes}, </span>
            <span>Edges: {edges}, </span>
            <span>Source: {camelCaseToTitleCase(description.split(':')[0])}</span>
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
              handleListItemClick(event, index)
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
                <td align="left" valign="baseline" width="100px" padding="0">
                  {genes}
                  {newline}
                  {pv}
                  {newline}
                  {similarity}
                </td>
                <td align="left" valign="baseline" padding="0">
                  {title}
                  {newline}
                  {subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      )
    } else {
      const node = (
        <span style={infoStyle}>
          <Typography display="inline">
            <strong>{nodes}</strong>{' '}
          </Typography>
          <Typography variant="caption" display="inline" color="textSecondary">
            {'nodes '}
          </Typography>
        </span>
      )

      const edge = (
        <span style={edgeStyle}>
          <Typography display="inline">
            <strong>{edges}</strong>{' '}
          </Typography>
          <Typography variant="caption" display="inline" color="textSecondary">
            {'edges'}
          </Typography>
        </span>
      )

      const title = (
        <Typography color="textPrimary" style={titleStyle}>
          {description}
        </Typography>
      )

      const subtitle = (
        <span style={subtitleStyle}>
          <Typography variant="caption" color="textSecondary">
            Parent: {details.parent_network_nodes} nodes, {details.parent_network_edges} edges
          </Typography>
        </span>
      )

      return (
        <ListItem
          button
          key={networkUUID}
          onClick={event => {
            handleFetch(networkUUID, description, nodes, edges, hitGenes)
            handleListItemClick(event, index)
          }}
          selected={selectedIndex === index}
        >
          <table style={tableStyle}>
            <tbody>
              <tr padding="0">
                <td rowSpan="2" align="center" valign="middle" padding="0">
                  {icon}
                </td>
                <td align="left" valign="baseline" width="75px">
                  {genes}
                  {newline}
                  {node}
                </td>
                <td align="left" valign="baseline" padding="0" width="80px">
                  {edge}
                </td>
                <td align="left" valign="baseline">
                  {title}
                  {newline}
                  {subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      )
    }
  }

  const renderNetworkListItemDefault = (networkEntry, handleListItemClick, selectedIndex, index) => {
    const { description, networkUUID, nodes, edges, imageURL, hitGenes, details, url } = networkEntry
    const genes = (
      <span style={infoStyle}>
        <Typography display="inline" color={'textSecondary'}>
          <strong>{hitGenes.length}</strong>{' '}
        </Typography>
        <Typography variant="caption" display="inline" color={'textSecondary'}>
          genes
        </Typography>
      </span>
    )

    const newline = <Typography>{'\n'}</Typography>

    let pVal = details.PValue
    if (pVal != null) {
      const networkCount = details.totalNetworkCount
      const threshold = Math.pow(10, Math.ceil(Math.log(1e-16 * networkCount) / Math.LN10))
      if (pVal < threshold) {
        pVal = '< ' + threshold
      } else if (pVal > 1) {
        pVal = '~ 1'
      } else {
        pVal = pVal.toExponential(2)
      }
    }

    const pv = (
      <span style={infoStyle}>
        <Typography display="inline" color={'textPrimary'}>
          <strong>{pVal} </strong>
        </Typography>
        <Typography variant="caption" display="inline" color={'textPrimary'}>
          pv
        </Typography>
      </span>
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
        <span style={infoStyle}>
          <Typography display="inline" color={'textSecondary'}>
            <strong>{sim} </strong>
          </Typography>
          <Typography variant="caption" display="inline" color={'textSecondary'}>
            similarity
          </Typography>
        </span>
      )
    } else {
      similarity = null
    }

    const title = <Typography style={titleStyle}>{description.split(':').slice(1)}</Typography>

    const subtitle = (
      <span style={subtitleStyle}>
        <Typography variant="caption" color="textSecondary">
          <span>
            Nodes: {nodes}
            {props.uiState.selectedSource !== 'pathwayfigures' ? ', ' : null}
          </span>
          {props.uiState.selectedSource !== 'pathwayfigures' ? <span>Edges: {edges}</span> : null}
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
            handleListItemClick(event, index)
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
              <td align="left" valign="baseline" width="100px" padding="0">
                {genes}
                {newline}
                {pv}
                {newline}
                {similarity}
              </td>
              <td align="left" valign="baseline" padding="0">
                {title}
                {newline}
                {subtitle}
              </td>
            </tr>
          </tbody>
        </table>
      </ListItem>
    )
  }

  return (
    <Split sizes={[40, 60]} gutterSize={7} className="ndex-base">
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
