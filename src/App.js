import React from 'react'
import MainContainer from './containers/MainContainer'
import TopPageContainer from './containers/TopPageContainer'

const Top = props => <TopPageContainer {...props} />
const App = props => <MainContainer {...props} />

export { App, Top }
