import React, { useState, useEffect } from 'react'
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

const EXAMPLES = ['kras egfr cdk4 tp53', 'per1 per2 clock', 'mtor wnt1 igf1']

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

  const [state, setState] = useState({ anchorEl: null, query: '' })

  useEffect(() => {
    if (props.search !== undefined && props.search.results !== null) {
      const jobId = props.search.results.jobId

      const pathParam = props
      console.log('** Search route:', jobId, pathParam)
      props.history.push(`/${jobId}`)
    }
    return () => {
      console.log('Page unmounted')
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
      query: EXAMPLES[exampleIdx],
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
    const sources = props.source.sources

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return
    }

    const sourceNames = sources.map(source => source.name)

    const geneListString = repaceDelimiters(genes)
    const geneList = geneListString.split(/ /)
    props.searchActions.setQuery(geneListString)
    props.searchActions.searchStarted({ geneList, sourceNames })
  }

  const repaceDelimiters = query => {
    // TODO: what's the supported set of delimiters?
    return query.replace(',', ' ')
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
          <MenuItem onClick={() => handleExample(0)}>Gene List 1</MenuItem>
          <MenuItem onClick={() => handleExample(1)}>Gene List 2</MenuItem>
          <MenuItem onClick={() => handleExample(2)}>Gene List 3</MenuItem>
        </Menu>
      </div>
      <InputBase
        className={classes.input}
        placeholder="Enter gene list (...or click menu for examples)"
        onChange={handleChange('query')}
        onKeyDown={handleKeyPress}
        value={state.query}
      />
      <IconButton
        color={'default'}
        className={classes.iconButton}
        aria-label="Directions"
        onClick={handleClear}
      >
        <DeleteIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton
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
