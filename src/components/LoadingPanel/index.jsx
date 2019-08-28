import React from 'react'
import './style.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

const LoadingPanel = props => (
  <div className="loading-container">
    <Typography className="loading-title" variant={'h5'} color="primary">
      {props.title}
    </Typography>
    <Typography className="loading-message" variant="subtitle1" color="initial">
      {props.message}
    </Typography>
    <CircularProgress size={100} />
  </div>
)

export default LoadingPanel
