import React from 'react'
import './style.css'
import SearchTextBox from './SearchTextBox'
import Footer from './Footer'

import ndex from '../../assets/images/ndex-logo.svg'
import LoadingPanel from '../LoadingPanel'
import { Typography } from '@material-ui/core'
import SourcePanel from './SourcePanel'

const StartPanel = props => {
  if (props.search.isSearching) {
    return <LoadingPanel />
  }

  return (
    <div className="start-container">
      <div className="start-title">
        <img className="start-logo-main" src={ndex} alt="logo" />
        {/*<img className="start-logo" src={dna} alt="logo" />*/}
        {/*<Typography variant="h1">&rarr;</Typography>*/}
        {/*<img className="start-logo" src={idea} alt="logo" />*/}
      </div>
      <SearchTextBox {...props} />

      <SourcePanel {...props} />
      <Footer />
    </div>
  )
}

export default StartPanel
