import React from "react";
import "./style.css";

import Split from "react-split";

import NetworkView from "./NetworkView";
import NetworkList from "./NetworkList";

import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import { ListItem } from "@material-ui/core";

/**
 * Top page for the application
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Ndex = props => {
  const geneList = props.search.queryList;

  const sourceUUID = props.sourceUUID;

  const id = props.search.results.jobId;

  const handleFetch = (
    networkUUID,
    networkName,
    nodeCount,
    edgeCount,
    hitGenes
  ) => {
    //checkCytoscapeConnection(props)

    // Reset selection
    props.searchActions.clearSelectedGenes();

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
        if (pVal !== 0) {
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
        <Typography style={{ lineHeight: "1.33" }}>
          {description.split(":").slice(1)}
        </Typography>
      );

      const subtitle = (
        <Typography
          variant="caption"
          color="textSecondary"
          style={{ lineHeight: "1" }}
        >
          Nodes: {nodes}, Edges: {edges}, Source: {description.split(":")[0]}
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
          <table>
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
          <Typography color="textPrimary" style={{ lineHeight: "1.33" }}>
            {description}
          </Typography>
        </React.Fragment>
      );

      const subtitle = (
        <Typography variant="caption" color="textSecondary">
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
          <table>
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

    /*
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
          <ListItemIcon style={{ width: "30px" }}>
            <img className="list-icon" src={imageURL} alt="list icon" />
          </ListItemIcon>
          <table tableLayout="fixed" width="100%">
            <tbody>
              <tr>
                <td colSpan="4" width="100%">
                  <Typography>{description}</Typography>
                </td>
              </tr>
              <tr>
                <td width="25%">
                  <Typography display="inline" color="textSecondary">
                    <strong>{hitGenes.length}</strong>{" "}
                  </Typography>
                  <Typography variant="caption" display="inline" color="textSecondary">
                    genes
                  </Typography>
                </td>
                <td width="25%">
                  <Typography display="inline" color="textSecondary">
                    <strong>{pVal}</strong>{" "}
                  </Typography>
                  <Typography variant="caption" display="inline" color="textSecondary">
                    pv
                  </Typography>
                </td>
                <td width="25%">
                  <Typography variant="caption" color="textSecondary">{nodes} nodes</Typography>
                </td>
                <td width="25%">
                  <Typography variant="caption" color="textSecondary">{edges} edges</Typography>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                <Typography variant="caption" color="textSecondary">Source: WikiPathways</Typography>
              </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      );
    }

    /*

    const icon = (
      <ListItemIcon style={{ minWidth: "0px" }}>
        <img className="list-icon" src={imageURL} alt="list icon" />
      </ListItemIcon>
    );

    const geneNumber = (
      <React.Fragment>
        <Typography variant="caption" color="textSecondary">
          Genes
        </Typography>
        <Typography variant="body1">
          <font color="#333333">
            <strong>{hitGenes.length}</strong>
          </font>
        </Typography>
      </React.Fragment>
    );

    const title = <Typography color="textPrimary">{description}</Typography>;

    if (props.uiState.selectedSource === "enrichment") {
      let pValueNumber = "";
      let pVal = details.PValue;
      if (pVal !== undefined) {
        if (pVal !== 0) {
          pVal = pVal.toExponential(2);
        }
        pValueNumber = (
          <React.Fragment>
            <Typography variant="caption" color="textSecondary">
              p-Value
            </Typography>
            <Typography variant="body1" noWrap="true">
              <font color="#333333">
                <strong>{pVal}</strong>
              </font>
            </Typography>
          </React.Fragment>
        );
      }

      const sourceName = (
        <Typography variant="caption" color="textSecondary">
          Source
        </Typography>
      );

      const nodesAndEdges = (
        <Typography variant="caption" color="textSecondary">
          Nodes: {nodes}, Edges: {edges}
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
          <table tableLayout="fixed">
            <tbody>
              <tr height="50%">
                <td rowSpan="2" align="center" valign="middle" width="50px">
                  {icon}
                </td>
                <td align="center" valign="bottom" width="100px">
                  {geneNumber}
                </td>
                <td rowSpan="2" align="left" valign="top">
                  <div>{title}</div>
                  <div>{nodesAndEdges}</div>
                  <div>{sourceName}</div>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top" width="100px">
                  {pValueNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      );
    } else {
      const nodeNumber = (
        <React.Fragment>
          <Typography variant="caption" color="textSecondary">
            Nodes
          </Typography>
          <Typography variant="subtitle1">
            <font color="#333333">
              <strong>{nodes}</strong>
            </font>
          </Typography>
        </React.Fragment>
      );

      const edgeNumber = (
        <React.Fragment>
          <Typography variant="caption" color="textSecondary">
            Edges
          </Typography>
          <Typography variant="subtitle1">
            <font color="#333333">
              <strong>{edges}</strong>
            </font>
          </Typography>
        </React.Fragment>
      );

      const parentNodesAndEdges = (
        <Typography variant="caption" color="textSecondary">
          Parent nodes: {nodes}, Parent edges: {edges}
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
          <table tableLayout="fixed">
            <tbody>
              <tr height="50%">
                <td rowSpan="2" align="center" valign="middle" width="50px">
                  {icon}
                </td>
                <td colSpan="3" align="center" valign="bottom" width="100px">
                  {geneNumber}
                </td>
                <td rowSpan="2" align="left" valign="top">
                  {title}
                  {parentNodesAndEdges}
                </td>
              </tr>
              <tr>
                <td align="right" valign="top" width="49px">
                  {nodeNumber}
                </td>
                <td width="2px" />
                <td align="left" valign="top" width="49px">
                  {edgeNumber}
                </td>
              </tr>
            </tbody>
          </table>
        </ListItem>
      );
    }

    /*
    const topDescription = (
      <React.Fragment>
        Nodes: <strong>{nodes}</strong>, Edges: <strong>{edges}</strong>
      </React.Fragment>
    );

    const bottomDescription1 = (
      <React.Fragment>
        Overlap: <strong>{hitGenes.length}</strong> out of {querySize} genes
      </React.Fragment>
    );

    let bottomDescription2 = "";
    const pVal = details.PValue;
    if (pVal !== undefined) {
      let pValText = pVal.toExponential(2);
      if (pVal === 0) {
        pValText = 0;
      }
      bottomDescription2 = (
        <React.Fragment>
          p-value = <strong>{pValText}</strong>
        </React.Fragment>
      );
    }

    return (
      <ListItem
        button
        className={classes.menuItem}
        key={networkUUID}
        onClick={event => {
          handleFetch(networkUUID, description, nodes, edges, hitGenes);
          handleListItemClick(event, index);
        }}
        selected={selectedIndex === index}
      >
        <ListItemIcon>
          <img className="list-icon" src={imageURL} alt="list icon" />
        </ListItemIcon>
        <ListItemText
          primary={
            <div className={classes.listTitle}>
              <Typography color="textPrimary">{description}</Typography>
            </div>
          }
          secondary={
            <Typography
              component="span"
              variant={"caption"}
              color="textSecondary"
            >
              {topDescription}
              <br />
              {bottomDescription1}
              <br />
              {bottomDescription2}
            </Typography>
          }
        />
      </ListItem>
    );
    */
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

export default Ndex;
