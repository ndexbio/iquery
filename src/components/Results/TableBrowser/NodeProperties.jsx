import React, { useState } from "react";
import Linkify from "linkifyjs/react";
import parse from "html-react-parser";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import { camelCaseToTitleCase } from "./camel-case-util.js";
import { stripScripts } from "./strip-scripts-util.js";
import { findAttributes } from "./attribute-util";

import GeneAnnotationList from "./GeneAnnotationList";
import ExpandPanel from "./ExpandPanel";

let index = 0;

const useStyles = makeStyles(theme => ({
  noPadding: {
    paddingTop: "0",
    paddingBottom: "0"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%"
  },
  wideList: {
    marginTop: "0",
    width: "100%",
    padding: "0"
  },
  table: {
    width: "100%",
    tableLayout: "fixed"
  }
}));

const NodeProperties = props => {
  const classes = useStyles();
  const nodes = props.network.selectedNodes;
  const context = props.context;

  const [defaultExpanded, setDefaultExpanded] = useState(true);

  const entityProperties = ["Name", "HGNC", "Ensembl", "Alias", "Type"];

  const nodeProperties = [
    "Height",
    "Width",
    "Shape",
    "Is GPML Shape",
    "Color",
    "Fill Color",
    "Transparent",
    "Border Thickness",
    "Border Style",
    "Label Size",
    "Label Font",
    "Id"
  ];

  const displayItems = [entityProperties, nodeProperties];

  const sortedNodes = nodes.sort((a, b) => {
    if (a.name.toUpperCase() > b.name.toUpperCase()) {
      return 1;
    } else {
      return -1;
    }
  });

  const topDisplay = [];
  sortedNodes.forEach(node => {
    console.log(node)
    //Filter properties
    const attributes = [];
    let content;
    let title;
    let geneAnnotation = null;
    let inset = false;
    if (
      props.search.results != null &&
      props.search.results.genes.get(node.name) != null
    ) {
      inset = true;
      geneAnnotation = (
        <List className={classes.noPadding}>
          <GeneAnnotationList
            {...props}
            search_results={props.search.results}
            geneSymbol={node.name}
          />
        </List>
      );
    }
    for (let key in node) {
      content = extractContent(node[key]);
      title = extractTitle(key);
      if (
        !title.startsWith("__") &&
        content != null &&
        content !== "null" &&
        content !== ""
      ) {
        if (title === "alias") {
          const [prefix, id] = content.split(":");
          if (prefix in context) {
            attributes.push({
              title: "Alias",
              content:
                '<a href="' + context[prefix] + id + '">' + content + "</a>",
              displayed: false
            });
          }
        } else {
          attributes.push({
            title: camelCaseToTitleCase(title),
            content: content,
            displayed: false
          });
        }
      }
    }

    const displayCol1 = [];
    const displayCol2 = [];
    let primaryString;
    let secondaryString;
    displayItems.forEach(list => {
      primaryString = "";
      let currentEntry;
      list.forEach(element => {
        currentEntry = attributes.filter(entry => {
          return entry.title === element;
        })[0];
        if (currentEntry != null && currentEntry.content != null) {
          primaryString +=
            currentEntry.title + ": " + currentEntry.content + "<br>";
          currentEntry.displayed = true;
        }
      });
      primaryString = formatPrimary(primaryString);
      if (primaryString !== "") {
        switch (list) {
          case entityProperties:
            secondaryString = "Entity Properties";
            displayCol1.push(
              <ListItem key={index++} className={classes.noPadding}>
                <ListItemText
                  inset={inset}
                  primary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography variant="body2">{primaryString}</Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
            break;
          case nodeProperties:
            secondaryString = "Node Properties";
            displayCol2.push(
              <ListItem
                key={index++}
                className={classes.noPadding}
                disableGutters={true}
              >
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography variant="caption" color="textSecondary">
                        {secondaryString}
                      </Typography>
                      <div>
                        <Typography variant="body2">{primaryString}</Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
            break;
        }
      }
    });

    primaryString = "";
    attributes.forEach(entry => {
      if (!entry.displayed) {
        primaryString += entry.title + ": " + entry.content + "<br>";
        entry.displayed = true;
      }
    });
    primaryString = formatPrimary(primaryString);
    secondaryString = "Additional properties";

    if (primaryString !== "") {
      displayCol1.push(
        <ListItem key={index++} className={classes.noPadding}>
          <ListItemText
            inset={inset}
            primary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary">
                  {secondaryString}
                </Typography>
                <div>
                  <Typography variant="body2">{primaryString}</Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      );
    }

    const summary = <Typography variant="body2">{node.name}</Typography>;
    const details = (
      <table className={classes.table}>
        <tbody>
          <tr>
            <td colSpan="2" valign="top">
              {geneAnnotation}
            </td>
          </tr>
          <tr>
            <td valign={"top"}>{displayCol1}</td>
            <td valign={"top"}>{displayCol2}</td>
          </tr>
        </tbody>
      </table>
    );
    topDisplay.push(
      <ExpandPanel
        summary={summary}
        details={details}
        defaultExpanded={defaultExpanded}
        keyId={node.id + index++}
        divider={true}
      />
    );
  });

  //Don't return nothing
  if (topDisplay.length === 0) {
    return (
      <div className={"outer-rectangle"}>
        <div className={classes.center}>
          <Typography color="textSecondary" variant="subtitle1">
            Select a node to view node properties
          </Typography>
        </div>
      </div>
    );
  } else if (topDisplay.length === 1) {
    if (!defaultExpanded) {
      setDefaultExpanded(true);
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={"inner-rectangle"}>
          <List className={classes.noPadding}>{topDisplay}</List>
        </div>
      </div>
    );
  } else {
    if (defaultExpanded) {
      setDefaultExpanded(false);
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={"inner-rectangle"}>
          <div>
            <List className={classes.noPadding}>{topDisplay}</List>
          </div>
        </div>
      </div>
    );
  }
};

const extractContent = entry => {
  if (entry == null) {
    return "";
  }
  return stripScripts(entry);
};

const extractTitle = entry => {
  if (entry == null) {
    return "";
  }
  return stripScripts(entry);
};

const formatPrimary = entry => {
  if (entry === "") {
    return entry;
  }
  let modifiedText = entry
    .replace(/<\/?p\/?>/gi, "<br>")
    .replace(/(<\/?br\/?>)+/gi, "<br>")
    .replace(/(\n)+/gi, "\n")
    .replace(/<a\s+href=/gi, '<a target="_blank" href=')
    .trim();
  if (modifiedText.startsWith("<br>")) {
    modifiedText = modifiedText.slice(4, modifiedText.length - 1);
  }
  if (modifiedText.endsWith("<br>")) {
    modifiedText = modifiedText.slice(0, modifiedText.length - 4);
  }
  modifiedText = parse(camelCaseToTitleCase(modifiedText));
  return (
    <Linkify key={"link" + index++} newTab={true}>
      {modifiedText}
    </Linkify>
  );
};

export default NodeProperties;
