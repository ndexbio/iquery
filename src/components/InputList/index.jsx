import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import './style.css'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
})

const InputList = props => {
  const { classes } = props

  const results = props.search.results

  if (!results) {
    return <div />
  }

  const geneList = results.genes
  if (!geneList) {
    return <div />
  }

  const values = []
  for (let value of geneList.values()) {
    values.push(value)
  }
  return (
    <div className="matched">
      <Typography variant="h6">
        Matched Genes:
      </Typography>
      <List className={classes.root}>
        {values.map(entry => getListItem(entry, classes))}
      </List>
    </div>
  )
}

const getListItem = (geneEntry, classes) => {
  return (
    <ListItem alignItems="flex-start" key={geneEntry._id}>
      <ListItemAvatar>
        <Avatar>G</Avatar>
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
            <Typography variant="caption">
              {'Species: ' + geneEntry.taxid}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default withStyles(styles)(InputList)
