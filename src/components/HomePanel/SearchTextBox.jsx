import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Refresh'
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

  const handleClear = () => {
    setState({ ...state, query: '' })
  }

  const handleSearch = event => {
    const genes = state.query
    props.searchActions.setQuery(genes)
    props.searchActions.searchStarted(genes)
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
        value={state.query}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="Search"
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="Directions"
        onClick={handleClear}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  )
}

SearchTextBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchTextBox)
