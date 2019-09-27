import React, { useEffect } from "react"
import "./style.css"

import SearchTextBox from "./SearchTextBox"
import Footer from "./Footer"
import LoadingPanel from "../LoadingPanel"
import Typography from "@material-ui/core/Typography"

import ndex from "../../assets/images/ndex-logo.svg"
import queryString from "query-string"
import { Tooltip } from "@material-ui/core"
import Link from "@material-ui/core/Link"

const feedbackURL = "https://home.ndexbio.org/contact-us/"

const StartPanel = props => {
  useEffect(() => {
    const params = queryString.parse(props.location.search)
    const genes = params.genes

    if (genes !== undefined) {
      const geneList = genes.split(",")
      props.searchActions.setQuery(genes)
      props.searchActions.searchStarted({ geneList })
    }

    props.sourceActions.findSourceStarted()

    return () => {}
  }, [])

  if (props.search.isSearching) {
    return (
      <LoadingPanel
        title={"Searching Remote Database"}
        message={<div style={{ color: "black" }}>Please wait...</div>}
      />
    )
  }

  return (
    <div className="start-container">
      <div className="start-title">
        <div
          style={{
            position: "relative",
            paddingTop: "0.1em",
            paddingBottom: "2em",

            display: "flex",
            flexDirection: "column",
            marginBottom: "-0.5em"
          }}
        >
          <Typography align="center" color="textSecondary">
            One search finds pathways, queries protein interaction networks,
          </Typography>
          <Typography align="center" color="textSecondary">
            and discovers disease, drug, and tissue associations.
          </Typography>
          <Typography align="center" color="textSecondary">
            Powered by NDEx and integrated with Cytoscape.
          </Typography>
        </div>
        <div align="center" className="inlineFlex">
          <img
            className="start-logo-main"
            src={ndex}
            alt="logo"
            style={{ height: "8.75em", paddingRight: "1em" }}
          />
          <div className="flex">
            <Typography
              variant="h3"
              align="left"
              style={{
                whiteSpace: "noWrap",
                position: "relative",
                top: "0.1em"
              }}
            >
              NDEx Integrated Query
            </Typography>
            <Typography
              align="left"
              style={{ position: "relative", left: "0.25em", top: "-0.1em" }}
            >
              v0.2 Pre-Release.
            </Typography>
          </div>
        </div>

        <div align="center" style={{ paddingBottom: "3em", paddingTop: "1em" }}>
          <SearchTextBox {...props} />
        </div>
      </div>
        <Link href={feedbackURL} target="_blank" color="textSecondary" underline="none">
          <div className="flex">
            <Typography variant="caption" align="center">
            NDEx Integrated Query uses selected pathway and interactome networks
            in NDEx to power gene set analysis.
            </Typography>
            <Typography variant="caption" align="center">
            The networks come from many different sources and new networks will
            be continously added.
            </Typography>
            <Typography variant="caption" align="center">
            Do you have a pathway or an interaction network that you would like
            to include in these queries? Click{" "}
              <Link href={feedbackURL} target="_blank">
                <font color="#00A1DE">
                  <em>here</em>
                </font>
              </Link>{" "}
            to find out how.
            </Typography>
          
          </div>
        </Link>
      <Footer />
    </div>
  )
}

export default StartPanel
