import React from "react"
import { withStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import ErrorIcon from "@material-ui/icons/Error"
import IconButton from "@material-ui/core/IconButton"
import LinkIcon from "@material-ui/icons/Launch"
import InfoIcon from "@material-ui/icons/Info"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import Tooltip from "@material-ui/core/Tooltip"

import "./style.css"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Collapse from "@material-ui/core/Collapse"

const MAX_DESCRIPTION_LENGTH = 150

const GENE_CARDS_URL = "https://www.genecards.org/cgi-bin/carddisp.pl?gene="

const styles = theme => ({
  inline: {
    display: "inline"
  },
  title: {
    marginLeft: "0.5em",
    marginTop: "0.3em"
  },
  description: {
    marginLeft: "1em",
    marginTop: "0.3em"
  },
  matched: {
    backgroundColor: "teal"
  },
  unmatched: {
    backgroundColor: "red"
  },
  linkIcon: {
    paddingLeft: "1em"
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
})

class GeneDetails extends React.Component {
  state = {}

  componentDidMount() {}

  handleClick = id => {
    console.log("OPEN = = = ", id)
    const tag = "pw_" + id
    const curState = this.state[tag]

    if (curState === undefined || curState == null) {
      this.setState(state => ({ [tag]: true }))
    } else {
      this.setState(state => ({ [tag]: !curState }))
    }
  }

  render() {
    const { classes, network, search } = this.props

    const results = search.results
    const hits = network.hitGenes

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
          {"Matched Genes: " + values.length + ""}
        </Typography>

        <div className="gene-list">
          <List>{values.map(entry => this.getListItem(entry, classes, hits))}</List>
        </div>

        {notFound.length !== 0 ? this.getNotFound(notFound, classes) : null}
      </div>
    )
  }

  getListItem = (geneEntry, classes, hits) => {
    let description = geneEntry.summary
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      description = description.substring(0, MAX_DESCRIPTION_LENGTH - 1) + "..."
    }

    console.log("HITS:", hits)
    return (
      <React.Fragment>
        <ListItem
          alignItems="flex-start"
          key={geneEntry._id}
          button
          onClick={e => this.handleClick(geneEntry._id)}
        >
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
                <Typography variant="caption">{description}</Typography>
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
          {this.state["pw_" + geneEntry._id] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {this.getListChildren(geneEntry, classes)}
      </React.Fragment>
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
                      primary={dbName + ": " + pwEntry.id}
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
          {"Unmatched: " + notFound.length}
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

const getPathwayStateTag = id => "pw_" + id

export default withStyles(styles)(GeneDetails)
