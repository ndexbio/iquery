import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const LoggedInPanel = props => {
  const { profile, logoutHandler } = props
  return (
    <div>
      <Avatar className="ndex-account-avatar" src={profile.image}>
        U
      </Avatar>
      <Typography variant="h4" className="ndex-account-greeting">
        Hi, {profile.name}
      </Typography>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  )
}

export default LoggedInPanel