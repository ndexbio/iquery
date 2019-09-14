import React from "react";
import "./style.css";
import MemoCytoscapeViewer from "../CytoscapeViewer";
import LoadingPanel from "../../LoadingPanel";

const NetworkViewer = props => {
  if (props.network.isFetching) {
    return (
      <div className="network-view">
        <LoadingPanel title="Loading Network..." color="#FFFFFF" />
      </div>
    );
  } else if (props.search.actualResults.length === 0) {
    return <div className="network-view" />;
  } else {
    return (
      <div className="network-view">
        {props.network.isFetching ? (
          <LoadingPanel title="Loading Network..." color="#FFFFFF" />
        ) : (
          <MemoCytoscapeViewer resized={props.resized} {...props} />
        )}
      </div>
    );
  }
};

export default NetworkViewer;
