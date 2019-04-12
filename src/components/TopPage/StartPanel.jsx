import React, { useEffect } from 'react'
import './style.css'
import SearchTextBox from './SearchTextBox'
import Footer from './Footer'

import ndex from '../../assets/images/ndex-logo.svg'
import LoadingPanel from '../LoadingPanel'
import SourcePanel from './SourcePanel'

import queryString from 'query-string'

const StartPanel = props => {
  useEffect(() => {
    const params = queryString.parse(props.location.search)
    const genes = params.genes

    if (genes !== undefined) {
      const geneList = genes.split(',')
      //TODO: call actual API
      props.searchActions.setQuery(genes)
      console.log('Got genes.  Start search now!', geneList)
      props.searchActions.searchStarted({ geneList })
    }

    props.sourceActions.findSourceStarted()
    return () => {
      console.log('Page unmounted')
    }
  }, [])

  if (props.search.isSearching) {
    return (
      <LoadingPanel
        title={'Searching Remote Database'}
        message={'Please wait...'}
      />
    )
  }

  return (
    <div className="start-container">
      <div className="start-title">
        <img className="start-logo-main" src={ndex} alt="logo" />
      </div>
      <SearchTextBox {...props} />
      <SourcePanel {...props} />
      <Footer />
    </div>
  )
}

export default StartPanel
