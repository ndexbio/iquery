import React, { useEffect } from 'react'
import './style.css'

import SearchTextBox from './SearchTextBox'
import Footer from './Footer'
import LoadingPanel from '../LoadingPanel'

import ndex from '../../assets/images/ndex-logo.svg'
import queryString from 'query-string'

const StartPanel = props => {
  useEffect(() => {
    const params = queryString.parse(props.location_search)
    const genes = params.genes

    if (genes !== undefined) {
      const geneList = genes.split(',')
      props.searchActions_setQuery(genes)
      props.searchActions_searchStarted({ geneList })
    }

    props.sourceActions_findSourceStarted()

    return () => {
    }
  }, [])

  if (props.search.isSearching) {
    return (
      <LoadingPanel
        title={'Searching Remote Database'}
        message={
          <div style={{color: 'black'}}>
            Please wait...
          </div>
        }
      />
    )
  }

  return (
    <div className="start-container">
      <div className="start-title">
        <img className="start-logo-main" src={ndex} alt="logo" />
      </div>
      <SearchTextBox 
        search={props.search}
        searchActions_setQuery={props.searchActions_setQuery}
        searchActions_searchStarted={props.searchActions_searchStarted}
  
        source_sources={props.source_sources}

        history={props.history}
      />
      <Footer />
    </div>
  )
}

export default StartPanel
