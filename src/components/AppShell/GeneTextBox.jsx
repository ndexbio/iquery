import React, { useState, useEffect, useRef } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'

import { loadCSS } from 'fg-loadcss/src/loadCSS'
import Icon from '@material-ui/core/Icon'
import Tooltip from '@material-ui/core/Tooltip'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30vmin',
    padding: '0.3em',
    background: '#f1f1f1',
    marginLeft: '1em'
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

const ORIGINAL_GENE_TEXT = 'original-gene-text'

const GeneTextBox = props => {
  const { classes } = props
  const geneTextRef = useRef(null)

  const [queryText, setQuery] = useState(props.search.queryGenes)

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    )
    return () => {
    }
  }, [])

  const handleCopy = () => {
    // This is a hack...
    const copyText = document.getElementById(ORIGINAL_GENE_TEXT)
    copyText.select()
    document.execCommand('copy')
  }

  const handleSearch = (evt, val) => {
    console.log('Search start:', queryText)

    const genes = queryText
    const sources = props.source.sources

    if (genes.length === 0 || sources === null || sources.length === 0) {
      // TODO: add better error message
      return
    }

    const sourceNames = sources.map(source => source.name)

    const geneListString = genes.replace(',', ' ')
    const geneList = geneListString.split(/ /)

    props.searchActions.clearAll()
    props.history.push('/')
    props.searchActions.setQuery(geneListString)
    props.searchActions.searchStarted({ geneList, sourceNames })
  }

  const handleChange = (evt) => {
    const value = evt.target.value
    setQuery(value)
  }

  return (
    <Paper className={classes.root} elevation={0}>
      <InputBase
        id={ORIGINAL_GENE_TEXT}
        className={classes.input}
        placeholder="Genes entered"
        value={queryText}
        onChange={handleChange}
        ref={geneTextRef}
      />
      <Divider className={classes.divider} />
      <Tooltip title="Copy" placement="bottom">
        <IconButton
          color="default"
          className={classes.iconButton}
          aria-label="Directions"
          onClick={handleCopy}
        >
          <Icon className={classNames(classes.icon, 'far fa-clipboard')} />
        </IconButton>
      </Tooltip>

      <Divider className={classes.divider} />

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
  )
}

export default withStyles(styles)(GeneTextBox)
