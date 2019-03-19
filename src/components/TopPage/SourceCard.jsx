import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 345,
    maxWidth: 345,
    minHeight: 140,
    marginLeft: '1em'
  },
  cardAction: {
    pointerEvents: 'none'
  },
  media: {
    objectFit: 'cover'
  }
}

const SourceCard = props => {
  const { classes, source } = props

  return (
    <Card elevation={1} className={classes.card}>
      <CardActionArea className={classes.cardAction} disableRipple={true}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {source.name}
          </Typography>
          <Typography gutterBottom variant="subheading">
            {'Version: ' + source.version}
          </Typography>
          <Typography component="p">{source.description}</Typography>
          <Typography variant="subtitle1">
            {'Service Status: ' + source.status}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions />
    </Card>
  )
}

SourceCard.propTypes = {
  classes: PropTypes.object.isRequired,
  source: PropTypes.object.isRequired
}

export default withStyles(styles)(SourceCard)
