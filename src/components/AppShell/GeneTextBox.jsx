import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";

import { loadCSS } from "fg-loadcss/src/loadCSS";
import Icon from "@material-ui/core/Icon";
import Tooltip from "@material-ui/core/Tooltip";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import MessageSnackbar from "./MessageSnackbar";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "50vmin",
    padding: "0.3em",
    background: "#f1f1f1",
    marginLeft: "1em"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

const ORIGINAL_GENE_TEXT = "original-gene-text";

const GeneTextBox = props => {
  const { classes } = props;
  const geneTextRef = useRef(null);

  const [queryText, setQuery] = useState(props.search.queryGenes);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
    return () => {};
  }, []);

  const handleCopy = () => {
    // This is a hack...
    const copyText = document.getElementById(ORIGINAL_GENE_TEXT);
    copyText.select();
    document.execCommand("copy");

    // Show message
    setOpen(true);
  };

  const handleSearch = evt => {
    const genes = queryText;
    const sources = props.source.sources;

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return;
    }

    const sourceNames = sources.map(source => source.name);

    const geneListString = genes.replace(",", " ");
    const geneList = geneListString.split(/\s*,\s*|\s+/);

    props.searchActions.clearAll();
    props.uiStateActions.setSelectedSource("enrichment")
    props.history.push("/");
    props.searchActions.setQuery(genes);
    props.searchActions.searchStarted({ geneList, sourceNames });
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setQuery(value);
  };

  const handleClear = evt => {
    setQuery("");
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div>
      <MessageSnackbar
        open={open}
        setOpen={setOpen}
        message={"Genes are copied to clipboard!"}
        autoHideDuration={4000}
        horizontal={"left"}
        vertical={"bottom"}
      />
      <Paper className={classes.root} elevation={0}>
        <Tooltip title="Copy" placement="bottom">
          <IconButton
            color="default"
            className={classes.iconButton}
            aria-label="Copy"
            onClick={handleCopy}
          >
            <Icon className={classNames(classes.icon, "far fa-clipboard")} />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <Tooltip title="Clear gene list" placement="bottom">
          <IconButton
            color="default"
            className={classes.iconButton}
            aria-label="Clear"
            onClick={handleClear}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Divider className={classes.divider} />
        <InputBase
          id={ORIGINAL_GENE_TEXT}
          className={classes.input}
          placeholder="Genes entered"
          value={queryText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          ref={geneTextRef}
        />

        <Tooltip title="Start new search" placement="bottom">
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="Directions"
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
