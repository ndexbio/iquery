import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import disconnected from '../../assets/images/disconnected.svg'

const styles = {
  card: {
    minWidth: 345,
    maxWidth: 345,
    padding: '1em'
  },
  media: {
    objectFit: 'fit'
  }
}

const ErrorCard = props => {
  const { classes } = props

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Error loading source"
          className={classes.media}
          height="300"
          src={disconnected}
          title="Error loading source"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color={'error'}>
            Failed to access services
          </Typography>
          <Typography component="p" color={'error'}>
            Something is wrong with tne search service. After a few moments,
            please reload the page and try again.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant={'outlined'}
          size="small"
          color="primary"
          onClick={handleReload}
        >
          Reload
        </Button>
      </CardActions>
    </Card>
  )
}

const handleReload = () => {
  window.location.reload(true)
}

ErrorCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ErrorCard)
