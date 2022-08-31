import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie6 from '../../assets/movies/tour_6_annotations.mov'

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


const Slide6 = () => {
  const classes = useStyles()

  return (
    <>
      <video src={tourMovie6} style={{border: '1px solid #d6d6d6'}}  width="725" height="400" muted autoplay="autoplay"  controls loop>
      </video>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '3.13953488vh' }}>
          Annotations
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '5px' }}>
        Nodes and edges in the graphic can be clicked to explore their annotations
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '5px' }}>
        Annotations often include a text paragraph that support the interaction
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '5px' }}>
        Annotations often contain direct links to publications and other external resources 
        </Typography>

      </div>
    </>
  )
}

export default Slide6