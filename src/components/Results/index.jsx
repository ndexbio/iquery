import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Empty from './Empty'
import Hits from '../Hits'
import Ndex from './Ndex'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
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

    const searchResult = this.props.search.results

    // Display message panel if no result is available
    if (searchResult === null) {
      return <Empty />
    }

    return (
      <div className="results-container">
        <div className="results-wrapper">
          <Tabs
            value={value}
            onChange={this.handleChange}
          >
            <Tab
              label={'NDEx (' + this.props.search.results.ndex.numFound + ')'}
            />
            <Tab label="Enrichment (22)" />
            <Tab label="Interactome (102)" />
          </Tabs>
          {value === 0 && <Ndex {...this.props} />}
          {value === 1 && <h2>Enrichment</h2>}
          {value === 2 && <h2>Interactome</h2>}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Results)
