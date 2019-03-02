import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Empty from './Empty'
import Ndex from './Ndex'

const styles = theme => ({
  tabs: {
    width: '100%',
    backgroundColor: '#FFFFFF'
  }
})

const Results = props => {
  // useEffect(() => {
  //   if (props.search.results !== null) {
  //     const jobId = props.search.results.jobId
  //     props.history.push(`/${jobId}`)
  //   }
  //   return () => {
  //     console.log('Page unmounted')
  //   }
  // }, [])

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { classes, ...others } = props

  const searchResult = props.search.results

  console.log('Current Result:', searchResult)

  // Display message panel if no result is available
  if (searchResult === null) {
    return <Empty />
  }

  return (
    <div className="results-container">
      <div className="results-wrapper">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Enrichment" />
          <Tab label="Neighborhoods" />
          <Tab label={'Keywords'} />
        </Tabs>
        {value === 0 && <Ndex {...others} panelType={'enrichment'} />}
        {value === 1 && <h2>Neighborhoods</h2>}
        {value === 2 && <Ndex {...others} />}
      </div>
    </div>
  )
}

export default withStyles(styles)(Results)
