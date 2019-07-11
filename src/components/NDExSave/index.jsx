import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DialogContentText, DialogActions, Button } from '@material-ui/core'

import config from './assets/config'
import './style.css'

const styles = theme => ({})

class NDExSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      networkUrl: ''
    }
  }

  saveToNDEx = (cx, token) => {
    this.props.ndexSaveActions.saveToNDEx({ cx: cx, token: token })
  }

  handleClose = () => {
    this.props.ndexSaveActions.setNDExModalOpen(false)
  }

  render() {
    const { ndexSave, network } = this.props
    const token = ndexSave.profile ? ndexSave.profile.authorization.token : null
    const cx = network.originalCX

    console.log('NDExSave render token' + token)
    const networkUrl = undefined

    return ndexSave && ndexSave.profile ? (
      <div className="ndex-save">
        <DialogContentText>
          Now that you're logged in, you can save the network to your NDEx
          account
        </DialogContentText>
        <DialogActions>
          {networkUrl ? (
            <Button href={networkUrl} target="_blank">
              Open in NDEx
            </Button>
          ) : (
            <Button
              onClick={() => {
                this.saveToNDEx(cx, token)
              }}
            >
              Save to my account
            </Button>
          )}
        </DialogActions>
      </div>
    ) : null
  }
}

export default withStyles(styles)(NDExSave)
