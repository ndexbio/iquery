import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  root: {

  }
}))

export default function ExpandPanel(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(props.defaultExpanded)

  function handleClick() {
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick} key={props.keyId}>
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