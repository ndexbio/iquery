import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { Typography } from "@material-ui/core";

import './style.css'

/**
 * Default panel when user start searching
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const Empty = props => (
  <div className="empty">
    <Typography variant="h3" className="message">
      &larr; Enter / drag & drop a gene list to the text area
    </Typography>
  </div>
)

export default Empty
