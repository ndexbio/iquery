import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingIcon from '@material-ui/icons/Settings'
import github from '../../assets/images/github.svg'
import CloudIcon from '@material-ui/icons/Cloud'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Tooltip from '@material-ui/core/Tooltip'

import './style.css'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  }
})

class SettingsPanel extends React.Component {
  state = {
    servicesOpen: true
  }

  handleClick = () => {
    this.setState(state => ({ servicesOpen: !state.servicesOpen }))
  }

  handleDrawerClose = () => {
    const isOpen = this.props.uiState.isSettingsOpen
    this.props.uiStateActions.setSettingsOpen(!isOpen)
  }

  render() {
    const { classes, theme } = this.props
    const isOpen = this.props.uiState.isSettingsOpen
    const sources = this.props.source.sources

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className="drawerHeader">
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.root}>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <CloudIcon />
            </ListItemIcon>
            <ListItemText inset primary="Services" />
            {this.state.servicesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.servicesOpen} timeout="auto" unmountOnExit>
            <List component="div" key="0">
              {sources.map(sourceEntry => (
                <Tooltip
                  title={'Version: ' + sourceEntry.version}
                  placement="right"
                >
                  <ListItem button key={sourceEntry.uuid} className={classes.nested}>
                    <ListItemIcon>
                      <CloudIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={sourceEntry.name}
                      secondary={' Status: ' + sourceEntry.status}
                    />
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          {['Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                <SettingIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {LINKS.map(link => (
            <ListItem button key={link.name} onClick={() => openLink(link.url)}>
              <ListItemIcon>
                <img src={link.src} height="24px" width="24px" />
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    )
  }
}

const LINKS = [
  {
    name: 'Source Code',
    url: 'https://github.com/idekerlab/search-portal',
    src: github
  }
]

const openLink = url => {
  window.open(url, '_blank')
}

SettingsPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SettingsPanel)
