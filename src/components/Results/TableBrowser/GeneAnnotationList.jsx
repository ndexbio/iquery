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
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import './style.css'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Collapse from '@material-ui/core/Collapse'
import CheckIcon from '@material-ui/icons/Check'
import { camelCaseToTitleCase } from './camel-case-util.js'


// For external link

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
    backgroundColor: '#C51162'
  },
  unmatched: {
    backgroundColor: 'red'
  },
  linkIcon: {
    paddingLeft: '1em'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class GeneAnnotationList extends React.Component {
  state = {}

  handleClick = id => {
    const tag = 'pw_' + id
    const curState = this.state[tag]

    if (curState === undefined || curState == null) {
      this.setState(state => ({ [tag]: true }))
    } else {
      this.setState(state => ({ [tag]: !curState }))
    }
  }

  render() {
    const { classes, search } = this.props

    const results = search.results

    if (!results) {
      return <div className="gene-list-wrapper" />
    }

    const geneList = results.genes

    if (!geneList) {
      return <div className="gene-list-wrapper" />
    }

    const symbol = this.props.geneSymbol.toUpperCase()

    return this.getListItem(geneList.get(symbol), classes)
  }

  getListItem = (geneEntry, classes) => {
    if (geneEntry === null || geneEntry === undefined) {
      return null
    }

    let description = geneEntry.summary
    return (
      <ListItem
        alignItems="flex-start"
        key={geneEntry._id}
        onClick={e => this.handleClick(geneEntry._id)}
      >
        <ListItemAvatar>
          <Avatar className={classes.matched}>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body1"
            >
              {geneEntry.symbol}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                variant="caption"
              >
                {camelCaseToTitleCase(geneEntry.name)}
              </Typography>
              <Typography variant="body1">
                {description}
              </Typography>
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

  getListChildren = (entry, classes) => {
    const pathway = entry.pathway

    const pathwaySources = Object.keys(pathway)

    return (
      <Collapse
        in={this.state[getPathwayStateTag(entry._id)]}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {pathwaySources.map(dbName => {
            const pathways = pathway[dbName]

            if (!Array.isArray(pathways)) {
              return (
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={pathways.name} />
                </ListItem>
              )
            }

            return (
              <React.Fragment>
                {pathways.map(pwEntry => (
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText
                      inset
                      primary={dbName + ': ' + pwEntry.id}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {pwEntry.name}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            )
          })}
        </List>
      </Collapse>
    )
  }

  getNotFound = (notFound, classes) => {
    return (
      <div>
        <Divider variant="middle" />
        <Typography className={classes.title} variant="body1">
          {'Unmatched: ' + notFound.length}
        </Typography>
        <List>
          {notFound.map(entry => this.getUnmatchedListItem(entry, classes))}
        </List>
      </div>
    )
  }

  getUnmatchedListItem = geneEntry => {
    return (
      <ListItem alignItems="flex-start" key={geneEntry}>
        <ListItemIcon>
          <ErrorIcon />
        </ListItemIcon>
        <ListItemText inset primary={geneEntry} />
      </ListItem>
    )
  }
}

const getPathwayStateTag = id => 'pw_' + id

export default withStyles(styles)(GeneAnnotationList)
