import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DialogContentText, DialogActions, Button } from '@material-ui/core'

import './style.css'
import { getToken } from '../../authentication'

const styles = (theme) => ({
  button: {
    'text-transform': 'none',
    height: '2.5em',
  },
})

class NDExSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      networkUrl: '',
    }
  }

  saveToNDEx = (cx, token) => {
    this.props.ndexSaveActions.saveToNDEx({ cx: cx, token: token })
  }

  handleClose = () => {
    this.props.ndexSaveActions.setNDExModalOpen(false)
  }

  render() {
    const { classes, ndexSave, network } = this.props
    const cx = network.originalCX

    const networkUrl = ndexSave.networkUrl

    const ndexSaveContent = (
      <div className="ndex-save">
        <DialogContentText>Now that you're logged in, you can save the network to your NDEx account</DialogContentText>
        <DialogActions>
          {networkUrl ? (
            <Button href={networkUrl} className={classes.button} target="_blank">
              OPEN IN NDEx
            </Button>
          ) : (
            <Button
              onClick={() => {
                getToken(ndexSave.keycloak, ndexSave.profile).then((token) => {
                  this.saveToNDEx(cx, token)
                })
              }}
            >
              Save to my account
            </Button>
          )}
        </DialogActions>
      </div>
    )

    return ndexSaveContent
  }
}

export default withStyles(styles)(NDExSave)
