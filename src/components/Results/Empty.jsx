import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography } from '@material-ui/core'
import logo from '../../assets/images/cytoscape-logo.svg'

import './style.css'

/**
 * Default panel when user start searching
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Empty = props => (
  <div className="results-container">
    <div className="message">
      <img src={logo} className="home-logo" />
      <Typography variant="h2">Cytoscape Cloud &alpha;</Typography>
      <Typography variant="subtitle1">
        Enter / drag & drop a gene list to the text area
      </Typography>

    </div>
  </div>
)

export default Empty
