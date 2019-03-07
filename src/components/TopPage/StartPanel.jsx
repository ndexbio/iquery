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
    console.log('**MOUNTED: path params:', params)

    const genes = params.genes

    if(genes !== undefined) {
      const geneNames = genes.split(',')
      console.log('Got genes.  Start search now!', geneNames)
      //TODO: call actual API
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
