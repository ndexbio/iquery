import React from 'react'
import Button from '@material-ui/core/Button'
import './style.css'
import RefreshIcon from '@material-ui/icons/Refresh'
import Tooltip from '@material-ui/core/Tooltip'

import { withStyles } from '@material-ui/core/styles'

const EXAMPLES = ['kras egfr cdk4 tp53', 'per1 per2 clock', 'mtor wnt1 igf1']

const styles = theme => ({
  ...theme,
  button: {
    marginLeft: '0.5em'
  }
})

const SearchPanel = props => {
  const { classes } = props

  const handleStartOver = event => {
    props.searchActions.clearAll()
  }


  return (
    <div className="search">
      <div className="buttons">
        <Tooltip title="Restart Search" placement="bottom">
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleStartOver}
            fullWidth
          >
            <RefreshIcon />
          </Button>
        </Tooltip>
      </div>
    </div>
  )
}

export default withStyles(styles)(SearchPanel)
