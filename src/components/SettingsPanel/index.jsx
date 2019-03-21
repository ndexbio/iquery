import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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
import HelpIcon from '@material-ui/icons/Help'
import './style.css'

const drawerWidth = 240

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
})

class SettingsPanel extends React.Component {
  handleDrawerClose = () => {
    const isOpen = this.props.uiState.isSettingsOpen
    this.props.uiStateActions.setSettingsOpen(!isOpen)
  }

  render() {
    const { classes, theme } = this.props
    const isOpen = this.props.uiState.isSettingsOpen

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
              <ListItemIcon>{link.icon}</ListItemIcon>
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
    name: 'Help',
    url: 'https://github.com/idekerlab/search-portal/wiki',
    icon: <HelpIcon />
  },
  {
    name: 'Source Code',
    url: 'https://github.com/idekerlab/search-portal',
    icon: <SettingIcon />
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
