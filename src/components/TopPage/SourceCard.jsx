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
import ndexLogo from '../../assets/images/ndex-logo.svg'
import cyLogo from '../../assets/images/cytoscape-logo.svg'
import dna from '../../assets/images/dna.svg'
import idea from '../../assets/images/idea.svg'

const styles = {
  card: {
    minWidth: 345,
    maxWidth: 345,
    minHeight: 150,
    marginLeft: '1em'
  },
  media: {
    objectFit: 'cover'
  }
}

const IMAGES = [ndexLogo, cyLogo, dna, idea]
const randomImage = () => {
  const idx = Math.floor(Math.random() * 4)
  return IMAGES[idx]
}

const SourceCard = props => {
  const { classes, source } = props

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {source.name}
          </Typography>
          <Typography gutterBottom variant="subheading">
            {'(v' + source.version + ')'}
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
