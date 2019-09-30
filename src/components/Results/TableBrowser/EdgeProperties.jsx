import React, { useState } from "react"
import Linkify from "linkifyjs/react"
import parse from "html-react-parser"
import { isEqual } from "lodash"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/styles"
import ExpandPanel from "./ExpandPanel"
import CheckIcon from "@material-ui/icons/Check"
import Avatar from "@material-ui/core/Avatar"

import { camelCaseToTitleCase } from "./camel-case-util.js"
import { stripScripts } from "./strip-scripts-util.js"

let index = 0

const useStyles = makeStyles(theme => ({
  noPadding: {
    paddingTop: "0",
    paddingBottom: "0"
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%"
  },
  wideList: {
    marginTop: "0",
    width: "100%",
    padding: "0"
  },
  table: {
    width: "100%",
    tableLayout: "fixed"
  },
  matched: {
    backgroundColor: "#C51162",
    height: "1em",
    width: "1em"
  },
  icon: {
    height: "0.5em",
    weidth: "0.5em"
  }
}))

const EdgeProperties = props => {
  const classes = useStyles()
  let edges
  if (props.network.selectedEdges.length === 0) {
    edges = props.network.network.elements
      .filter((elem) => {
        return elem.data.id[0] === "e"
      })
      .map(elem => {
        return elem.data
      })
  } else {
    edges = props.network.selectedEdges
  }

  const nodes = props.nodeList
  const context = props.context
  const [defaultExpanded, setDefaultExpanded] = useState(true)

  const entityProperties = [
    "Source",
    "Target",
    "Type",
    "SBO Type",
    "Interaction",
    "Throughput",
    "Location",
    "Citation"
  ]

  const edgeProperties = [
    "Start Arrow",
    "End Arrow",
    "Connector Type",
    "Line Thickness",
    "Line Style",
    "Color",
    "Edge Id"
  ]

  const displayItems = [entityProperties, edgeProperties]

  edges.sort((a, b) => {
    let aScore = 0
    let bScore = 0
    const aSource = findNode(a.source, nodes)
    const aTarget = findNode(a.target, nodes)
    const bSource = findNode(b.source, nodes)
    const bTarget = findNode(b.target, nodes)
    if (aSource !== "") {
      aScore++
    }
    if (aTarget !== "") {
      aScore++
    }
    if (bSource !== "") {
      bScore++
    }
    if (bTarget !== "") {
      bScore++
    }
    if (bScore - aScore !== 0) {
      return bScore - aScore
    } else if (aSource === "") {
      return 1
    } else if (bSource === "") {
      return -1
    }

    if (aSource.toUpperCase() > bSource.toUpperCase()) {
      return 1
    } else if (aSource.toUpperCase() < bSource.toUpperCase()) {
      return -1
    } else if (aTarget.toUpperCase() > bTarget.toUpperCase()) {
      return 1
    } else {
      return -1
    }
  })

  const topDisplay = []
  edges.forEach(edge => {
    //Filter properties
    const attributes = []
    let content
    let title
    let source
    let target
    for (let key in edge) {
      content = extractContent(edge[key])
      title = extractTitle(key)
      if (
        !title.startsWith("__") &&
        content != null &&
        content !== "null" &&
        content !== ""
      ) {
        if (title === "source") {
          source = findNode(content, nodes)
          attributes.push({
            title: "Source",
            content: source,
            displayed: false
          })
        } else if (title === "target") {
          target = findNode(content, nodes)
          attributes.push({
            title: "Target",
            content: target,
            displayed: false
          })
        } else if (title === "id") {
          attributes.push({
            title: "Edge Id",
            content, content,
            displayed: false
          })
        } else if (title === "sboType") {
          const id = content.split(":")[1]
          attributes.push({
            title: "SBO Type",
            content:
              "<a href=\"" + "http://identifiers.org/SBO:" + id + "\">" + content + "</a>"
          })
        } else {
          const [prefix, id] = content.split(":")
          if (prefix in context && id != undefined) {
            attributes.push({
              title: camelCaseToTitleCase(title),
              content: 
                "<a href=\"" + context[prefix] + id + "\">" + content + "</a>",
              displayed: false
            })
          } else {
            attributes.push({
              title: camelCaseToTitleCase(title),
              content: content,
              displayed: false
            })
          }
        }
      }
    }

    const displayCol1 = []
    const displayCol2 = []
    let primaryString
    let secondaryString
    displayItems.forEach(list => {
      primaryString = ""
      let currentEntry
      list.forEach(element => {
        currentEntry = attributes.filter(entry => {
          return entry.title === element
        })[0]
        if (currentEntry != null && currentEntry.content != null) {
          primaryString +=
            currentEntry.title + ": " + currentEntry.content + "<br>"
          currentEntry.displayed = true
        }
      })
      primaryString = formatPrimary(primaryString)
      if (primaryString !== "") {
        switch (list) {
        case entityProperties:
          secondaryString = "Entity Properties"
          displayCol1.push(
            <ListItem key={Math.random()} className={classes.noPadding}>
              <ListItemText
                inset={false}
                primary={
                  <React.Fragment>
                    <Typography variant="caption" color="textSecondary">
                      {secondaryString}
                    </Typography>
                    <div>
                      <Typography variant="body2">{primaryString}</Typography>
                    </div>
                  </React.Fragment>
                }
              />
            </ListItem>
          )
          break
        case edgeProperties:
          secondaryString = "Edge Properties"
          displayCol2.push(
            <ListItem
              key={Math.random()}
              className={classes.listPadding}
              disableGutters={true}
            >
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography variant="caption" color="textSecondary">
                      {secondaryString}
                    </Typography>
                    <div>
                      <Typography variant="body2">{primaryString}</Typography>
                    </div>
                  </React.Fragment>
                }
              />
            </ListItem>
          )
          break
        }
      }
    })

    primaryString = ""
    attributes.forEach(entry => {
      if (!entry.displayed) {
        primaryString += entry.title + ": " + entry.content + "<br>"
        entry.displayed = true
      }
    })
    primaryString = formatPrimary(primaryString)
    secondaryString = "Additional properties"

    if (primaryString !== "") {
      displayCol1.push(
        <ListItem key={index++} className={classes.noPadding}>
          <ListItemText
            inset={false}
            primary={
              <React.Fragment>
                <Typography variant="caption" color="textSecondary">
                  {secondaryString}
                </Typography>
                <div>
                  <Typography variant="body2">{primaryString}</Typography>
                </div>
              </React.Fragment>
            }
          />
        </ListItem>
      )
    }

    //Create summary
    let sourceSymbol = source
    let targetSymbol = target
    if (props.search.queryList.includes(source.toUpperCase())) {
      sourceSymbol = (
        <React.Fragment>
          <td>
          <Typography variant="body2">
            {source}
            </Typography>
          </td>
          <td>
            <Avatar className={classes.matched}>
              <CheckIcon className={classes.icon}/>
            </Avatar>
          </td>
        </React.Fragment>
      )
    }

    if (props.search.queryList.includes(target.toUpperCase())) {
      targetSymbol = (
        <React.Fragment>
          <td>
          <Typography variant="body2">
            {target}
            </Typography>
          </td>
          <td>
            <Avatar className={classes.matched}>
              <CheckIcon className={classes.icon}/>
            </Avatar>
          </td>

        </React.Fragment>
      )
    }

    const summary = (
      <table>
        <tbody>
          <tr>
            <td>
              <Typography variant="body2">
                {source}
              </Typography>
            </td>
            {props.search.queryList.includes(source.toUpperCase()) ?
              <td>
                <Avatar className={classes.matched}>
                  <CheckIcon className={classes.icon}/>
                </Avatar>
              </td> 
              : null
            }
            <td>
              <Typography variant="body2">
                {" ➝ "}
              </Typography>
            </td>
            <td>
              <Typography variant="body2">
                {target}
              </Typography>
            </td>
            {props.search.queryList.includes(target.toUpperCase()) ?
              <td>
                <Avatar className={classes.matched}>
                  <CheckIcon className={classes.icon}/>
                </Avatar>
              </td> 
              : null
            }
          </tr>
        </tbody>
      </table>

    )
    const details = (
      <table className={classes.table}>
        <tbody>
          <tr>
            <td valign={"top"}>{displayCol1}</td>
            <td valign={"top"}>{displayCol2}</td>
          </tr>
        </tbody>
      </table>
    )
    topDisplay.push(
      <ExpandPanel
        summary={summary}
        details={details}
        defaultExpanded={defaultExpanded}
        key={index++}
        divider={true}
      />
    )
  })

  //Don't return nothing
  if (topDisplay.length === 0) {
    return (
      <div className={"outer-rectangle"}>
        <div className={classes.center}>
          <Typography variant="subtitle1" color="textSecondary">
            Select an edge to view edge properties
          </Typography>
        </div>
      </div>
    )
  } else if (topDisplay.length === 1) {
    if (!defaultExpanded) {
      setDefaultExpanded(true)
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={"inner-rectangle"}>
          <List className={classes.noPadding}>{topDisplay}</List>
        </div>
      </div>
    )
  } else {
    if (defaultExpanded) {
      setDefaultExpanded(false)
    }
    return (
      <div className={"outer-rectangle"}>
        <div className={"inner-rectangle"}>
          <div>
            <List className={classes.noPadding}>{topDisplay}</List>
          </div>
        </div>
      </div>
    )
  }
}

const extractContent = entry => {
  if (entry == null) {
    return ""
  }
  return stripScripts(entry)
}

const extractTitle = entry => {
  if (entry == null) {
    return ""
  }
  return stripScripts(entry)
}

const formatPrimary = entry => {
  if (entry === "") {
    return entry
  }
  let modifiedText = entry
    .replace(/<\/?p\/?>/gi, "<br>")
    .replace(/(<\/?br\/?>)+/gi, "<br>")
    .replace(/(\n)+/gi, "\n")
    .replace(/<a\s+href=/gi, "<a target=\"_blank\" href=")
    .trim()
  if (modifiedText.startsWith("<br>")) {
    modifiedText = modifiedText.slice(4, modifiedText.length - 1)
  }
  if (modifiedText.endsWith("<br>")) {
    modifiedText = modifiedText.slice(0, modifiedText.length - 4)
  }
  modifiedText = parse(camelCaseToTitleCase(modifiedText))
  return (
    <Linkify key={"link:" + index++}>
      {modifiedText}
    </Linkify>
  )
}

const findNode = (nodeId, nodeArray) => {
  if (isNaN(nodeId) || nodeId === "") {
    return nodeId
  }
  const returnNode = nodeArray.filter(
    item => item["@id"].toString() === nodeId.toString()
  )[0]

  if (returnNode != null) {
    return returnNode.n
  } else {
    return ""
  }
}

//Necessary because otherwise open list items will collapse every time "SET_AVAILABLE" happens
const MemoEdgeProperties = React.memo(EdgeProperties, (prevProps, newProps) => {
  return isEqual(prevProps.network.selectedEdges, newProps.network.selectedEdges)
})

export default MemoEdgeProperties
