import React, { useState, useEffect, useRef } from "react"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import Divider from "@material-ui/core/Divider"

import { loadCSS } from "fg-loadcss/src/loadCSS"
import Icon from "@material-ui/core/Icon"
import Tooltip from "@material-ui/core/Tooltip"
import classNames from "classnames"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import DeleteIcon from "@material-ui/icons/Delete"
import MenuIcon from "@material-ui/icons/Menu"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import MessageSnackbar from "./MessageSnackbar"

import * as examples from "../TopPage/example-genes"

const EXAMPLES = examples.default.examples

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60vmin",
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
}

const ORIGINAL_GENE_TEXT = "original-gene-text"

const GeneTextBox = props => {
  const { classes } = props
  const geneTextRef = useRef()

  const [state, setState] = useState({
    anchorEl: null,
    query: props.search.queryGenes
  })
  const [open, setOpen] = useState(false)

  const menuOpen = Boolean(state.anchorEl)

  useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    )
    return () => {}
  }, [])

  const handleCopy = () => {
    // This is a hack...
    const copyText = document.getElementById(ORIGINAL_GENE_TEXT)
    copyText.select()
    document.execCommand("copy")

    // Show message
    setOpen(true)
  }

  const handleSearch = evt => {
    const genes = state.query
    const sources = props.source.sources

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return
    }

    const sourceNames = sources.map(source => source.name)

    const geneListString = genes.replace(",", " ")
    const geneList = geneListString.split(/\s*,\s*|\s+/)

    props.searchActions.clearAll()
    props.uiStateActions.setSelectedSource("enrichment")
    props.history.push("/")
    props.searchActions.setQuery(genes)
    props.searchActions.searchStarted({ geneList, sourceNames })
  }

  const handleChange = name => event => {
    setState({
      ...props,
      [name]: event.target.value
    })
  }

  const handleClear = () => {
    setState({ ...state, query: "" })
  }

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  const handleMenu = event => {
    setState({ ...state, anchorEl: event.currentTarget })
  }

  const handleClose = () => {
    setState({ ...state, anchorEl: null })
  }

  const handleExample = exampleIdx => {
    setState({
      ...props,
      query: EXAMPLES[exampleIdx].genes,
      anchorEl: null
    })
  }

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
        <Tooltip title="Query gene set examples" placement="bottom">
          <div>
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
              open={menuOpen}
              onClose={handleClose}
            >
              {EXAMPLES.map((example, idx) => {
                return (
                  <MenuItem key={idx} onClick={() => handleExample(idx)}>
                    {example.name}
                  </MenuItem>
                )
              })}
            </Menu>
          </div>
        </Tooltip>
        <Divider className={classes.divider} />
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
          value={state.query}
          onChange={handleChange("query")}
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
  )
}

export default withStyles(styles)(GeneTextBox)
