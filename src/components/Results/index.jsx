import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

const Results = props => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
)

Results.propTypes = {
  children: PropTypes.node.isRequired
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
})

class SimpleTabs extends React.Component {
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
        {value === 0 && <Results>Item One</Results>}
        {value === 1 && <Results>Item Two</Results>}
        {value === 2 && <Results>Item Three</Results>}
      </div>
    )
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Results)
