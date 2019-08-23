import React, { useEffect } from 'react'
import './style.css'

import SearchTextBox from './SearchTextBox'
import Footer from './Footer'
import LoadingPanel from '../LoadingPanel'

import ndex from '../../assets/images/ndex-logo.svg'
import queryString from 'query-string'

const StartPanel = props => {
  useEffect(() => {
    const params = queryString.parse(props.location.search)
    const genes = params.genes

    if (genes !== undefined) {
      const geneList = genes.split(',')
      props.searchActions.setQuery(genes)
      props.searchActions.searchStarted({ geneList })
    }

    props.sourceActions.findSourceStarted()

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
      <SearchTextBox {...props} />
      <Footer />
    </div>
  )
}

export default StartPanel
