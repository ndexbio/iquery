import "./style.css"
import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"
import { fade } from "@material-ui/core/styles/colorManipulator"
import { withStyles } from "@material-ui/core/styles"
import { Tooltip } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import InputLabel from "@material-ui/core/InputLabel"
import OutlinedInput from "@material-ui/core/OutlinedInput"


import OpenInCytoscapeButton from "./OpenInCytoscapeButton"
import ResetZoomButton from "./ResetZoomButton"
import Highlighter from "./Highlighter"
import OpenInNDExButton from "./OpenInNDExButton"
import NDExSignInModal from "../../NDExSignInModal"
import NDExSave from "../../NDExSave"
import OpenOriginalNetworkButton from "./OpenOriginalNetworkButton"
import { camelCaseToTitleCase } from "../TableBrowser/camel-case-util"

const styles = theme => ({
  toolbar: {
    background: "#EFEFEF",
    height: "4em",
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  buttonIcon: {
    height: "2.5em",
    paddingLeft: "0.5em"
  },
  buttons: {
    padding: "0.3em",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    border: "solid 1px #999999"
  },
  openIcon: {
    marginRight: "0.5em"
  },
  formControl: {
    position: "relative",
    top: "1.5px",
    marginLeft: "0.3em"
  },
  input: {
    padding: "8px 26px 8px 12px",
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderRadius: 4,
    "&:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)",
      borderRadius: 4
    },
    "&:hover": {
      backgroundColor: fade("rgb(65, 84, 178)", 0.08)
    }
  },
  root: {
    borderColor: "#ced4da",
    "& $notchedOutline": {
      borderColor: "rgb(65, 84, 178)",
    },
    "&:hover $notchedOutline": {
      borderColor: "rgb(65, 84, 178)"
    },
    "&$focused $notchedOutline": {
      borderColor: "rgb(65, 84, 178)",
      borderWidth: "1px"
    }
  },
  focused: {},
  notchedOutline: {}
})

const NetworkToolbar = props => {
  const { classes, ...other } = props
  let [prefix, name] = ["", ""]

  if (props.search.actualResults.length !== 0) {
    [prefix, name] = props.network.networkName.replace(":", "&").split("&")
  }

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = React.useState(0)
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  const menuItems = props.network.layouts
  const [value, setValue] = useState(props.network.layout)

  const handleChange = (event) => {
    setValue(event.target.value)
    props.networkActions.setLayout(event.target.value)
  }

  useEffect(() => {
    setValue(props.network.layout)
  }, [props.network.layout])

  return (
    <div className={classes.toolbar}>
      <Tooltip title={name ? camelCaseToTitleCase(prefix) + ":" + name : props.network.networkName}>
        <Typography
          className={classes.title}
          variant="subtitle1"
          color="inherit"
          noWrap
        >
          {name ? camelCaseToTitleCase(prefix) + ":" + name : props.network.networkName}
        </Typography>
      </Tooltip>
    
      <div className={classes.grow} />

      <div className={classes.formControl}>
        <FormControl variant="outlined">
          <InputLabel ref={inputLabel} htmlFor="outlined">
            <font color="#4154b2">
              Layout
            </font>
          </InputLabel>
          <Select
            value={value}
            onChange={handleChange}
            input={<OutlinedInput labelWidth={labelWidth} name="layout" id="outlined-layout" classes={classes}/>}
          >
            {menuItems.map((item) => (
              <MenuItem value={item}>
                <Typography variant="body2" color="textSecondary">
                  {item}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <ResetZoomButton {...other} />
      <Highlighter {...other} />
      <NDExSignInModal {...other}>
        <NDExSave {...props} />
      </NDExSignInModal>
      <OpenInNDExButton {...other} />
      <OpenInCytoscapeButton {...other} />
      <OpenOriginalNetworkButton {...other} />
    </div>
  )
}

NetworkToolbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NetworkToolbar)
