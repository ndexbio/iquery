import React from "react";
import "./style.css";

import Split from "react-split";

import NetworkView from "./NetworkView";
import NetworkList from "./NetworkList";

import { camelCaseToTitleCase } from "../TableBrowser/camel-case-util";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import { ListItem } from "@material-ui/core";

const titleStyle = {
  lineHeight: "1.33",
  wordBreak: "break-word"
};

const subtitleStyle = {
  lineHeight: "1",
  wordBreak: "break-word"
}

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => {
    const handleFetch = (
    networkUUID,
    networkName,
    nodeCount,
    edgeCount,
    hitGenes
  ) => {
    //checkCytoscapeConnection(props)
    const geneList = props.search.queryList;
    const sourceUUID = props.sourceUUID;
    const id = props.search.results.jobId;

    // Reset selection
    props.searchActions.clearSelectedGenes();
    props.uiStateActions.setHighlights(true);
    props.networkActions.networkFetchStarted({
      id,
      sourceUUID,
      networkUUID,
      networkName,
      geneList,
      hitGenes,
      nodeCount,
      edgeCount
    });
    updateHistory(networkUUID);
  };

  const updateHistory = networkUUID => {
    // Update URL
    const jobId = props.search.results.jobId;
    const searchResults = props.search.searchResults;
    const sourceName = props.uiState.selectedSource;

    if (searchResults !== undefined && searchResults !== null) {
      console.log("** network changed:", jobId, sourceName);
      props.history.push(`/${jobId}/${sourceName}/${networkUUID}`);
    }
  };

  const handleImportNetwork = () => {
    // Reset the UI state (hilight)
    props.uiStateActions.setHighlights(true);

    props.cyrestActions.importNetworkStarted({
      cx: props.network.originalCX,
      source: props.network.sourceId,
      uuid: props.network.uuid
    });
  };

  const renderNetworkListItem = (
    querySize,
    networkEntry,
    classes,
    handleListItemClick,
    selectedIndex,
    index
  ) => {
    const {
      description,
      networkUUID,
      nodes,
      edges,
      imageURL,
      hitGenes,
      details
    } = networkEntry;

    const genes = (
      <div display="inline">
        <Typography display="inline" style={{ lineHeight: "1.33" }}>
          <strong>{hitGenes ? hitGenes.length : "?"}</strong>{" "}
        </Typography>
        <Typography
          variant="caption"
          display="inline"
          color="textSecondary"
          style={{ lineHeight: "1" }}
        >
          genes
        </Typography>
      </div>
    );

    const icon = (
      <ListItemIcon style={{ width: "20px" }}>
        <img className="list-icon" src={imageURL} alt="list icon" />
      </ListItemIcon>
    );

    if (props.uiState.selectedSource === "enrichment") {
      let pVal = details.PValue;
      if (pVal !== undefined) {
        if (pVal < 1e-15) {
          pVal = "< 1e-15"
        } else { 
          pVal = pVal.toExponential(2);
        }
      }
      const pv = (
        <div display="inline">
          <Typography display="inline" style={{ lineHeight: "1" }}>
            <strong>{pVal}</strong>{" "}
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            color="textSecondary"
            style={{ lineHeight: "1" }}
          >
            pv
          </Typography>
        </div>
      );

      const title = (
        <Typography style={titleStyle}>
          {description.split(":").slice(1)}
        </Typography>
      );

      const subtitle = (
        <Typography
          variant="caption"
          color="textSecondary"
          style={subtitleStyle}
        >
          Nodes: {nodes}, Edges: {edges}, Source:{" "}
          {camelCaseToTitleCase(description.split(":")[0])}
        </Typography>
      );

      return (
        <ListItem
          button
          key={networkUUID}
          onClick={event => {
            handleFetch(networkUUID, description, nodes, edges, hitGenes);
            handleListItemClick(event, index);
          }}
          selected={selectedIndex === index}
        >
          <table style={{ tableLayout: "fixed", wordBreak: "breakWord" }}>
            <tbody>
              <tr height="50%">
                <td rowSpan="2" align="center" valign="middle">
                  {icon}
                </td>
                <td width="90px" align="left" valign="bottom">
                  {genes}
                </td>
                <td align="left" valign="bottom">
                  {title}
                </td>
              </tr>
              <tr>
                <td align="left" valign="baseline">
                  {pv}
                </td>
                <td align="left" valign="baseline">
                  {subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      );
    } else {
      const node = (
        <div display="inline">
          <Typography display="inline" style={{ lineHeight: "1" }}>
            <strong>{nodes}</strong>{" "}
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            color="textSecondary"
            style={{ lineHeight: "1" }}
          >
            {"nodes "}
          </Typography>
        </div>
      );

      const edge = (
        <div display="inline">
          <Typography display="inline" style={{ lineHeight: "1" }}>
            <strong>{edges}</strong>{" "}
          </Typography>
          <Typography
            variant="caption"
            display="inline"
            color="textSecondary"
            style={{ lineHeight: "1" }}
          >
            {"edges"}
          </Typography>
        </div>
      );

      const title = (
        <React.Fragment>
          <Typography color="textPrimary" style={titleStyle}>
            {description}
          </Typography>
        </React.Fragment>
      );

      const subtitle = (
        <Typography variant="caption" color="textSecondary" style={subtitleStyle}>
          Parent: {details.parent_network_nodes} nodes,{" "}
          {details.parent_network_edges} edges
        </Typography>
      );

      return (
        <ListItem
          button
          key={networkUUID}
          onClick={event => {
            handleFetch(networkUUID, description, nodes, edges, hitGenes);
            handleListItemClick(event, index);
          }}
          selected={selectedIndex === index}
        >
          <table style={{ tableLayout: "fixed", wordBreak: "break-word" }}>
            <tbody>
              <tr height="50%">
                <td rowSpan="2" align="center" valign="middle" width="50px">
                  {icon}
                </td>
                <td colSpan="2" align="left" valign="bottom" width="150px">
                  {genes}
                </td>
                <td align="left" valign="bottom">
                  {title}
                </td>
              </tr>
              <tr>
                <td align="left" valign="baseline" width="75px">
                  {node}
                </td>
                <td align="left" valign="baseline" width="80px">
                  {edge}
                </td>
                <td align="left" valign="baseline">
                  {subtitle}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      );
    }
  };

  return (
    <Split sizes={[40, 60]} gutterSize={7} className="ndex-base">
      <NetworkList
        renderNetworkListItem={renderNetworkListItem}
        handleFetch={handleFetch}
        hits={props.hits}
        {...props}
      />
      <NetworkView handleImportNetwork={handleImportNetwork} {...props} />
    </Split>
  );
};

/*const MemoNdex = React.memo(Ndex, (oldProps, newProps) => {
  
})*/

export default Ndex;
