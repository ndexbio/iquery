import React from 'react'
import './style.css'
import CircularProgress from '@material-ui/core/CircularProgress'

const LoadingPanel = props => (
  <div className="loading-container">
    <CircularProgress size={100} />
  </div>
)

export default LoadingPanel
