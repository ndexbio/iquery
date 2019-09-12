import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import searchLogo from '../../assets/images/search-logo.svg'

import * as examples from "./example-genes";

import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import { ThemeProvider } from "@material-ui/styles";

const EXAMPLES = examples.default.examples;

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
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

const SearchTextBox = props => {
  const { classes } = props;
  const searchButtonEl = useRef();

  const [state, setState] = useState({ anchorEl: null, query: "" });

  useEffect(() => {
    if (props.search.results !== null) {
      const jobId = props.search.results.jobId;
      props.history.push(`/${jobId}`);
    }
  }, []);

  const theme = createMuiTheme({
    palette: {
      primary: { main: purple[500] }, // Purple and green play nicely together.
      secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
    }
  });

  const open = Boolean(state.anchorEl);

  const handleMenu = event => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ ...state, anchorEl: null });
  };

  const handleExample = exampleIdx => {
    setState({
      ...props,
      query: EXAMPLES[exampleIdx].genes,
      anchorEl: null
    });
  };

  const handleChange = name => event => {
    setState({
      ...props,
      [name]: event.target.value
    });
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      // TODO: add validator here
      handleSearch();
    }
  };

  const handleClear = () => {
    setState({ ...state, query: "" });
  };

  const handleSearch = event => {
    const genes = state.query;
    const sources = props.source.sources;

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return;
    }

    const sourceNames = sources.map(source => source.name);
    const geneList = genes.toString().split(/\s*,\s*|\s+/);
    props.searchActions.setQuery(genes);
    props.searchActions.searchStarted({ geneList, sourceNames });
  };

  return (
    <React.Fragment>
      <Paper className={"search-text-box"} elevation={1}>
        {/*<div>
        <IconButton
          className={classes.iconButton}
          aria-label="Menu"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={state.anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          onClose={handleClose}
        >
          {EXAMPLES.map((example, idx) => {
            return (
              <MenuItem key={idx} onClick={() => handleExample(idx)}>
                {example.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
        <Divider className={classes.divider} />*/}
        <IconButton
          color={"default"}
          className={classes.iconButton}
          aria-label="Directions"
          onClick={handleClear}
        >
          <DeleteIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Enter gene list (or click an example below)"
          onChange={handleChange("query")}
          onKeyDown={handleKeyPress}
          value={state.query}
        />
          <IconButton
            ref={searchButtonEl}
            className={classes.iconButton}
            aria-label="Search"
            onClick={handleSearch}
          >
            <img alt="Search icon" src={searchLogo} style={{height: "27px"}}/>
          </IconButton>
      </Paper>
      <Typography
        variant="caption"
        style={{ paddingTop: "4px" }}
        color="textSecondary"
      >
        <em>Try this pre-release version, send us </em>
        <Link>
          <font color="#00A1DE">
            <em>feedback</em>
          </font>
        </Link>
      </Typography>
      <Typography
        align="left"
        style={{ paddingLeft: "116.14px", paddingTop: "16px" }}
      >
        Query gene set examples:
      </Typography>
      <Tooltip title="Hypoxia description">
        <Button onClick={() => handleExample(0)}>
          <font color="#00A1DE">Hypoxia</font>
        </Button>
      </Tooltip>
      <Tooltip title="Adenyl cyclase description">
        <Button color="primary" onClick={() => handleExample(1)}>
          <font color="#00A1DE">Adenyl Cyclase</font>
        </Button>
      </Tooltip>
      <Tooltip title="D4DGI description">
        <Button color="primary" onClick={() => handleExample(2)}>
          <font color="#00A1DE">D4DGI</font>
        </Button>
      </Tooltip>
      <Tooltip title="Angiotensin description">
        <Button color="primary" onClick={() => handleExample(3)}>
          <font color="#00A1DE">Angiotensin</font>
        </Button>
      </Tooltip>
      <Tooltip title="Estrogen description">
        <Button color="primary" onClick={() => handleExample(4)}>
          <font color="#00A1DE">Estrogen</font>
        </Button>
      </Tooltip>
    </React.Fragment>
  );
};

SearchTextBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchTextBox);
