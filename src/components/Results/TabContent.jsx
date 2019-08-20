import React from 'react'
import Ndex from './Ndex'

import LoadingPanel from '../LoadingPanel'

const TabContent = props => {
  const { results } = props

  if (results === null || results === undefined) {
    return (
      <LoadingPanel 
        title={'Loading results'} 
        message={
          <div style={{color: 'black'}}>
            Please wait...
          </div>
        }
      />
    )
  } else {
    const { sourceUUID } = results
    return <Ndex hits={results.results} sourceUUID={sourceUUID} {...props} />
  }
}

export default TabContent
