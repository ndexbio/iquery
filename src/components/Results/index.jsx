import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
})

class Results extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Enrichment" />
            <Tab label="NDEx" />
            <Tab label="Interactome" />
          </Tabs>
        </AppBar>
        {value === 0 && <h2>Item One</h2>}
        {value === 1 && <h2>Item Two</h2>}
        {value === 2 && <h2>Item Three</h2>}
      </div>
    )
  }
}

export default withStyles(styles)(Results)
