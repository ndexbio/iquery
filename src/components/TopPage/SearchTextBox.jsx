import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import { Tooltip } from '@material-ui/core'
import searchLogo from '../../assets/images/search-logo.svg'

import * as examples from './example-genes'

const EXAMPLES = examples.default.examples
const feedbackURL = 'https://home.ndexbio.org/contact-us/'

const styles = {
  root: {
    padding: '0.1em 0.25em',
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
    if (props.search.results !== null) {
      const jobId = props.search.results.jobId
      props.history.push(`/${jobId}`)
    }
  }, [])

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
    const sources = props.source.sources

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return
    }

    const sourceNames = sources.map(source => source.name)
    const geneList = genes.toString().split(/\s*,\s*|\s+/)
    props.searchActions.setQuery(genes)
    props.searchActions.searchStarted({ geneList, sourceNames })
  }

  return (
    <div className={'search-text-panel'}>
      <Paper className={'search-text-box'} elevation={1}>
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
          placeholder="Enter gene list (or click an example below)"
          onChange={handleChange('query')}
          onKeyDown={handleKeyPress}
          value={state.query}
          autoFocus={true}
        />
        <IconButton
          ref={searchButtonEl}
          className={classes.iconButton}
          aria-label="Search"
          onClick={handleSearch}
        >
          <img
            alt="Search icon"
            src={searchLogo}
            style={{ height: '1.25em' }}
          />
        </IconButton>
      </Paper>

      <div className={'query-example-panel'}>
        <Typography align={'center'} variant={'subtitle2'}>
          Query gene set examples:
        </Typography>

        <div className={'query-examples'}>
          <Tooltip title="Known Hypoxia genes" placement={'bottom'}>
            <Typography
              className={'example-text'}
              variant={'button'}
              color={'primary'}
              onClick={() => handleExample(0)}
            >
              Hypoxia
            </Typography>
          </Tooltip>
          <Tooltip title="Known Adenyl Cyclase genes" placement={'bottom'}>
            <Typography
              className={'example-text'}
              variant={'button'}
              color={'primary'}
              onClick={() => handleExample(1)}
            >
              Adenyl Cyclase
            </Typography>
          </Tooltip>
          <Tooltip title="D4DGI description" placement={'bottom'}>
            <Typography
              className={'example-text'}
              variant={'button'}
              color={'primary'}
              onClick={() => handleExample(2)}
            >
              D4DGI
            </Typography>
          </Tooltip>
          <Tooltip title="Angiotensin description" placement={'bottom'}>
            <Typography
              className={'example-text'}
              variant={'button'}
              color={'primary'}
              onClick={() => handleExample(3)}
            >
              Angiotensin
            </Typography>
          </Tooltip>
          <Tooltip title="Estrogen description" placement={'bottom'}>
            <Typography
              className={'example-text'}
              variant={'button'}
              color={'primary'}
              onClick={() => handleExample(4)}
            >
              Estrogen
            </Typography>
          </Tooltip>
        </div>
      </div>

      <Typography
        variant="caption"
        color="textSecondary"
        align={'center'}
        className={'search-text-caption'}
      >
        Try this pre-release version, send us
        <a href={feedbackURL} target="_blank">
          {' '}
          feedback
        </a>
      </Typography>
    </div>
  )
}

SearchTextBox.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SearchTextBox)
