import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie5 from '../../assets/movies/tour_5_toolbar.mov'

const useStyles = makeStyles(theme =>
  createStyles({
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      height: '41.8604651vh',
      margin: '0em 1em 2.09302326vh',
    },
    textContainer: {
      marginBottom: '1em',
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
    },
  }),
)


const Slide5 = () => {
  const classes = useStyles()

  return (
    <>
      <video src={tourMovie5} style={{border: '1px solid #d6d6d6'}}  width="725" height="400" muted autoplay="autoplay"  controls loop>
      </video>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '3.13953488vh' }}>
          Toolbar
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '10px' }}>
        Use the buttons in the toolbar at the top right to:
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginLeft: '10px' }}>
        - Change the layout
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginLeft: '10px' }}>
        - Turn on/off the query genes highlighting feature
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginLeft: '10px' }}>
        - Open the pathway in Cytoscape (Cytoscape must be running on your machine)
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginLeft: '10px' }}>
        - Show/hide the legend
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginLeft: '10px' }}>
        - Save the pathway to your NDEx account or view the source network in NDEx

        </Typography>
      </div>
    </>
  )
}

export default Slide5