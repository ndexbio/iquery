import React from 'react'
import './style.css'
import SearchTextBox from './SearchTextBox'
import Footer from './Footer'

import dna from '../../assets/images/dna.svg'
import idea from '../../assets/images/idea.svg'
import ndex from '../../assets/images/ndex-logo.svg'
import LoadingPanel from '../LoadingPanel'
import { Typography } from "@material-ui/core";

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

      <Typography variant="subtitle1">

      </Typography>
      <Footer />
    </div>
  )
}

export default StartPanel
