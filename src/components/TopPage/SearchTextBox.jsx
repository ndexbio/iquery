import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import DeleteIcon from '@material-ui/icons/Delete'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import * as examples from './example-genes'

const EXAMPLES = examples.default.examples

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center'
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

const SearchTextBox = props => {
  const { classes } = props
  const searchButtonEl = useRef()

  const [state, setState] = useState({ anchorEl: null, query: '' })

  useEffect(() => {
    if (props.search !== undefined && props.search.results !== null) {
      const jobId = props.search.results.jobId

      const pathParam = props
      props.history.push(`/${jobId}`)
    }
  }, [])

  const open = Boolean(state.anchorEl)

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

  const handleChange = name => event => {
    setState({
      ...props,
      [name]: event.target.value
    })
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      // TODO: add validator here
      handleSearch()
    }
  }

  const handleClear = () => {
    setState({ ...state, query: '' })
  }

  const handleSearch = event => {
    const genes = state.query
    const sources = props.source_sources

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return
    }
  
    const sourceNames = sources.map(source => source.name)
    const geneList = genes.toString().split(/\s*,\s*|\s+/)
    props.searchActions_setQuery(genes)
    props.searchActions_searchStarted({ geneList, sourceNames })
    
  }

  const repaceDelimiters = query => {
    // TODO: what's the supported set of delimiters?
    return query.replace(/,/g, ' ')
  }

  return (
    <Paper className={'search-text-box'} elevation={1}>
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
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
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
      <Divider className={classes.divider} />
      <IconButton
        color={'default'}
        className={classes.iconButton}
        aria-label="Directions"
        onClick={handleClear}
      >
        <DeleteIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Enter gene list (...or click menu for examples)"
        onChange={handleChange('query')}
        onKeyDown={handleKeyPress}
        value={state.query}
      />
      <IconButton
        ref={searchButtonEl}
        color={'primary'}
        className={classes.iconButton}
        aria-label="Search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

SearchTextBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchTextBox)
