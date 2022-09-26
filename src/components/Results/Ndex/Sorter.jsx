import './style.css'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import { alpha } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

const ranges = [
  {
    value: 'rank',
    label: 'Rank'
  },
  {
    value: 'name',
    label: 'Name'
  },
  {
    value: 'numNodes',
    label: 'Number of Nodes'
  },
  {
    value: 'numEdges',
    label: 'Number of Edges'
  },
  {
    value: 'overlap',
    label: '% Overlap'
  }
]

const styles = theme => ({
  toolbar: {
    background: '#FFFFFF'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sortBy: {
    width: '15em'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  }
})

const Sorter = props => {
  const { classes } = props

  const [values, setValues] = React.useState({
    sortBy: 'rank'
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  return (
    <TextField
      select
      label="Sort by:"
      value={values.sortBy}
      onChange={handleChange('sortBy')}
      className={classes.sortBy}
    >
      {ranges.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default withStyles(styles)(Sorter)
