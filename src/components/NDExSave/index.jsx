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

  saveToNDEx = () => {
    const { profile, cx } = this.props
    console.log(profile)

    const authorization = profile.authorization.token
    /*
    axios
      .post(config.save_to_ndex, cx, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization
        }
      })
      .then(resp => {
        const networkUrl = resp.data.replace('/v2/', '/#/')
        this.setState({ networkUrl })
      })
      .catch(err => {
        alert('Failed to save network to NDEx: ' + err)
      })
      */
  }

  handleClose = () => {
    this.props.handleClose()
  }

  render() {
    const { networkUrl } = this.state
    const { profile } = this.props

    return profile ? (
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
            <Button onClick={this.saveToNDEx}>Save to my account</Button>
          )}
        </DialogActions>
      </div>
    ) : null
  }
}

export default withStyles(styles)(NDExSave)
