import React, { useState } from 'react'
import { DialogContentText, DialogActions, Button } from '@material-ui/core'

// TODO This is the public server.  Provide other options
const BASE_URL = 'http://ndexbio.org/v2/network'

const NDExButton = props => {
  const [networkUrl, setNetworkUrl] = useState('')

  const saveToNDEx = () => {
    const { profile, cx } = props
    const authorization = profile.authorization.token

    const config = {
      method: 'POST',
      body: JSON.stringify(cx),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorization
      }
    }

    fetch(BASE_URL, config)
      .then(resp => {
        const networkUrl = resp.data.replace('/v2/', '/#/')
        setNetworkUrl(networkUrl)
      })
      .catch(err => {
        alert('Failed to save network to NDEx: ' + err)
      })
  }


  const { profile } = props

  return (
    profile && (
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
            <Button onClick={saveToNDEx}>Save to my account</Button>
          )}
        </DialogActions>
      </div>
    )
  )
}

export default NDExButton
