import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Empty from './Empty'
import Ndex from './Ndex'
import GeneDetails from './GeneDetails'

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
    const { classes, ...others } = this.props
    const { value } = this.state

    const searchResult = this.props.search.results

    // Display message panel if no result is available
    if (searchResult === null) {
      return <Empty />
    }

    return (
      <div className="results-container">
        <div className="results-wrapper">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Enrichment (22)" />
            <Tab label="Neighborhoods (102)" />
            <Tab
              label={
                'Keywords (' + this.props.search.results.ndex.numFound + ')'
              }
            />
          </Tabs>
          {value === 0 && <Ndex {...others} panelType={'enrichment'} />}
          {value === 1 && <h2>Neighborhoods</h2>}
          {value === 2 && <Ndex {...others} />}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Results)
