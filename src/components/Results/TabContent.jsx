import React from 'react'
import Ndex from './Ndex'

import LoadingPanel from '../LoadingPanel'

const TabContent = props => {
  const { results } = props

  if (results === null || results === undefined) {
    return <LoadingPanel title={'Loading results'} message={'Please wait...'} />
  } else {
    const { sourceUUID } = results
    return <Ndex hits={results.results} sourceUUID={sourceUUID} {...props} />
  }
}

export default TabContent
