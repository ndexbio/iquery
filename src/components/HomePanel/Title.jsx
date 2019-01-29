import React from 'react'
import './style.css'
import logo from '../../assets/images/cytoscape-logo.svg'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const test = () => {
  return 'foo'
}
const Title = () => (
  <header className="home-header">
    <Grid container justify={'center'} alignItems={'center'}>
      <Grid item>
        <img src={logo} className="home-logo" alt="logo" />
      </Grid>
      <Grid item>
        <Typography variant="h2">
          Cytoscape Cloud Portal
        </Typography>
      </Grid>
    </Grid>
  </header>
)

export default Title
