import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { DialogContentText, DialogActions, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { setNDExModalOpen, saveToNDEx } from '../../actions/ndexSave'

import config from './assets/config'
import './style.css'

const styles = theme => ({
  button: {
    'text-transform': 'none'
  }
})

class NDExSave extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      networkUrl: ''
    }
  }

  saveToNDEx = (cx, token) => {
    this.props.ndexSaveActions_saveToNDEx({ cx: cx, token: token })
  }

  handleClose = () => {
    this.props.ndexSaveActions_setNDExModalOpen(false)
  }

  render() {
    const { classes } = this.props
    const token = this.props.ndexSave_profile ? this.props.ndexSave_profile.authorization.token : null
    const cx = this.props.network_originalCX

    const networkUrl = this.props.ndexSave_networkUrl

    return this.props.ndexSave_profile ? (
      <div className="ndex-save">
        <DialogContentText>
          Now that you're logged in, you can save the network to your NDEx
          account
        </DialogContentText>
        <DialogActions>
          {networkUrl ? (
            <Button
              href={networkUrl}
              className={classes.button}
              target="_blank"
            >
              OPEN IN NDEx
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

const mapStateToProps = state => {
  return {
    ndexSave_networkUrl: state.ndexSave.networkUrl,
    ndexSave_profile: state.ndexSave.profile,
    network_originalCX: state.network.originalCX
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ndexSaveActions_setNDExModalOpen: (payload) => dispatch(setNDExModalOpen(payload)),
    ndexSaveActions_saveToNDEx: (payload) => dispatch(saveToNDEx(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (withStyles(styles)(NDExSave))
