import React from 'react'

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

export default function ExpandPanel(props) {
  const [open, setOpen] = React.useState(props.defaultExpanded)
  let style

  function handleClick() {
    setOpen(!open)
  }

  if (props.divider) {
    style = {
      borderTop: '1px solid #EFEFEF'
    }
  } else {
    style = {

    }
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick} key={props.keyId} style={style}>
        <ListItemText primary={props.summary} />
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItem >
            <ListItemText primary={props.details} />
          </ListItem>
        </List>
      </Collapse>
    </React.Fragment>
  )
}