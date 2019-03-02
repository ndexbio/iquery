import React, { useEffect } from 'react'
import './style.css'
import SearchTextBox from './SearchTextBox'
import Footer from './Footer'

import ndex from '../../assets/images/ndex-logo.svg'
import LoadingPanel from '../LoadingPanel'
import SourcePanel from './SourcePanel'

const StartPanel = props => {

  useEffect(() => {
    console.log('Checking available remote service')
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
