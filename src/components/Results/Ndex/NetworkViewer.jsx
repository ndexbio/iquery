import React from "react";
import "./style.css";
import MemoCytoscapeViewer from "../CytoscapeViewer";
import LoadingPanel from "../../LoadingPanel";

const NetworkViewer = props => (
  <div className="network-view">
    {props.network.isFetching ? (
      <LoadingPanel title="Loading Network..." color="#FFFFFF" />
    ) : (
      <MemoCytoscapeViewer resized={props.resized} {...props} />
    )}
  </div>
);

export default NetworkViewer;
