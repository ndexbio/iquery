import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const dummyServices = [
  {
    name: 'Enrichment',
    title: 'Relevant Pathways',
    hits: 10
  },
  {
    name: 'Interactome',
    title: 'Interactome search',
    hits: 20
  },
  {
    name: 'NDEx',
    title: 'NDEx network search',
    hits: 30
  }
]

const styles = theme => ({
  tiles: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#AAAAAA'
  },
  card: {
    height: '10em',
    padding: '0.5em'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {}
})

const Hits = props => {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Typography variant="h5">Hits:</Typography>

      <div className={classes.tiles}>
        <GridList className={classes.gridList} cols={2.5}>
          {dummyServices.map(tile => (
            <GridListTile key={tile.name}>
              <Paper className={classes.card}>
                <Typography variant="h5" component="h3">
                  This is a sheet of paper.
                </Typography>
                <Typography component="p">
                  Paper can be used to build surface or other elements for your
                  application.
                </Typography>
              </Paper>

              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title
                }}
                actionIcon={
                  <IconButton>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  )
}

Hits.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Hits)
