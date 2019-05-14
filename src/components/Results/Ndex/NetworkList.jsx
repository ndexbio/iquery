import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import MenuList from '@material-ui/core/MenuList'

import './style.css'
import Sorter from './Sorter'

const styles = theme => ({
  inline: {
    display: 'inline'
  },
  subtitle: {
    marginLeft: '1em',
    marginTop: '0.5em'
  },
  networkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#FAFAFA'
  },
  menuItem: {
    height: '4em',
    '&:focus': {
      backgroundColor: 'rgba(200,205,200,0.5)'
    }
  },
  menuText: {
    '&:focus': {}
  },
  secondary: {
    width: '15em',
    display: 'flex',
    alignItems: 'center',
    padding: '0.2em'
  },
  plot: {
    width: '80%',
    background: 'teal'
  }
})

const NetworkList = props => {
  const { classes, hits, renderNetworkListItem, network } = props

  if (!hits) {
    return <div className="network-list-wrapper" />
  }

  return (
    <div className="network-list-wrapper">
      <Sorter />

      <div className="network-list">
        <MenuList>
          {hits.map(entry => renderNetworkListItem(entry, classes))}
        </MenuList>
      </div>
    </div>
  )
}

export default withStyles(styles)(NetworkList)
