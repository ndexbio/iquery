import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ErrorIcon from '@material-ui/icons/Error'
import IconButton from '@material-ui/core/IconButton'
import LinkIcon from '@material-ui/icons/Launch'

import Tooltip from '@material-ui/core/Tooltip'

import './style.css'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const GENE_CARDS_URL = 'https://www.genecards.org/cgi-bin/carddisp.pl?gene='

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  title: {
    marginLeft: '0.5em',
    marginTop: '0.3em'
  },
  description: {
    marginLeft: '1em',
    marginTop: '0.3em'
  },
  matched: {
    backgroundColor: 'teal'
  },
  unmatched: {
    backgroundColor: 'red'
  },
  linkIcon: {
    paddingLeft: '1em'
  }
})

const InputList = props => {
  const { classes } = props

  const results = props.search.results

  if (!results) {
    return <div className="gene-list-wrapper" />
  }

  const geneList = results.genes
  const notFound = results.notFound

  if (!geneList) {
    return <div className="gene-list-wrapper" />
  }

  const values = []
  for (let value of geneList.values()) {
    values.push(value)
  }
  return (
    <div className="gene-list-wrapper">
      <Typography variant="h6">Search Result</Typography>
      <Typography variant="body1">
        {'Matched Genes: ' + values.length + ''}
      </Typography>

      <div className="gene-list">
        <List>{values.map(entry => getListItem(entry, classes))}</List>
      </div>

      {notFound.length !== 0 ? getNotFound(notFound, classes) : null}
    </div>
  )
}

const getListItem = (geneEntry, classes) => {
  return (
    <ListItem alignItems="flex-start" key={geneEntry._id}>
      <ListItemAvatar>
        <Avatar className={classes.matched}>G</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={geneEntry.symbol}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              className={classes.inline}
              color="textPrimary"
            >
              {geneEntry.name}
            </Typography>
            <Typography variant="caption">{geneEntry.summary}</Typography>
          </React.Fragment>
        }
      />
      <ListItemSecondaryAction className={classes.linkIcon}>
        <IconButton
          aria-label="Link to GeneCards"
          href={GENE_CARDS_URL + geneEntry.symbol}
          target="_blank"
        >
          <Tooltip title="Open in GeneCards" placement="bottom">
            <LinkIcon />
          </Tooltip>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

const getNotFound = (notFound, classes) => {
  return (
    <div>
      <Divider variant="middle" />
      <Typography className={classes.title} variant="body1">
        {'Unmatched: ' + notFound.length}
      </Typography>
      <List>{notFound.map(entry => getUnmatchedListItem(entry, classes))}</List>
    </div>
  )
}

const getUnmatchedListItem = geneEntry => {
  return (
    <ListItem alignItems="flex-start" key={geneEntry}>
      <ListItemIcon>
        <ErrorIcon />
      </ListItemIcon>
      <ListItemText inset primary={geneEntry} />
    </ListItem>
  )
}

export default withStyles(styles)(InputList)
