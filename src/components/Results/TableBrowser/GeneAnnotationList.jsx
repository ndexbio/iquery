import React from "react"

import { withStyles } from "@material-ui/core/styles"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import LinkIcon from "@material-ui/icons/Launch"
import Tooltip from "@material-ui/core/Tooltip"
import CheckIcon from "@material-ui/icons/Check"

import { camelCaseToTitleCase } from "./camel-case-util.js"
import "./style.css"



// For external link

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
    backgroundColor: "#C51162"
  },
  unmatched: {
    backgroundColor: "red"
  },
  linkIcon: {
    paddingLeft: "1em"
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
})

class GeneAnnotationList extends React.Component {
  state = {}

  handleClick = id => {
    const tag = "pw_" + id
    const curState = this.state[tag]

    if (curState === undefined || curState == null) {
      this.setState(state => ({ [tag]: true }))
    } else {
      this.setState(state => ({ [tag]: !curState }))
    }
  }

  render() {
    const { classes } = this.props

    const results = this.props.search_results

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
        disableGutters={true}
        style={{padding: "0"}}
      >
        <ListItemAvatar>
          <Avatar className={classes.matched}>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <table>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <Typography component="span" variant="body2" >
                        {geneEntry.symbol}
                      </Typography>
                    </div>
                    <div>
                      <Typography
                        component="span"
                        className={classes.inline}
                        variant="caption"
                        color='textSecondary'
                      >
                        {camelCaseToTitleCase(geneEntry.name)}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body2" color='textPrimary'>
                        {description}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Tooltip title="Open in GeneCards" placement="bottom">
                      <IconButton
                        aria-label="Link to GeneCards"
                        href={GENE_CARDS_URL + geneEntry.symbol}
                        target="_blank"
                      >
                        <LinkIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              </tbody>
            </table>
          }
        />
      </ListItem>
    )
  }    
} 

/*
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
*/

export default withStyles(styles)(GeneAnnotationList)