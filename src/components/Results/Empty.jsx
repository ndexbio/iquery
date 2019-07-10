import React from 'react'
import { Typography } from '@material-ui/core'

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
      <Typography variant="title">
        Enter gene list in the text area above.
      </Typography>

    </div>
  </div>
)

export default Empty
