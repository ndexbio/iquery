import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import './style.css'

import SearchTextBox from './SearchTextBox'
import Footer from './Footer'
import LoadingPanel from '../LoadingPanel'

import ndex from '../../assets/images/ndex-logo.svg'
import queryString from 'query-string'
import { searchStarted, setQuery } from '../../actions/search';
import {findSourceStarted} from '../../actions/source'

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

  if (props.search_isSearching) {
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
        history={props.history}
      />
      <Footer />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    search_isSearching: state.search.isSearching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchActions_searchStarted: (payload) => dispatch(searchStarted(payload)),
    searchActions_setQuery: (payload) => dispatch(setQuery(payload)),
    sourceActions_findSourceStarted: (payload) => dispatch(findSourceStarted(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPanel)