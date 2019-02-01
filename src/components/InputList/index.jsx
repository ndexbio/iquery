import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import './style.css'

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em',
  }
})

const InputList = props => {
  const { classes } = props

  const results = props.search.results

  if (!results) {
    return <div className="gene-list-wrapper" />
  }

  const geneList = results.genes
  if (!geneList) {
    return <div className="gene-list-wrapper" />
  }

  const values = []
  for (let value of geneList.values()) {
    values.push(value)
  }
  return (
    <div className="gene-list-wrapper">
      <Typography className={classes.subtitle} variant="subtitle1">
        Matched Genes:
      </Typography>

      <div className="gene-list">
        <List>
          {values.map(entry => getListItem(entry, classes))}
        </List>
      </div>
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
            <Typography variant="caption">{geneEntry.summary}</Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  )
}

export default withStyles(styles)(InputList)
