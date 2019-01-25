import React from 'react'
import './style.css'
import logo from '../../assets/images/cytoscape-logo.svg'

import SearchPanel from '../SearchPanel'
import Title from './Title'

const HomePanel = props => (
  <div className="home">

    <Title />
    <SearchPanel />
  </div>
)

export default HomePanel
