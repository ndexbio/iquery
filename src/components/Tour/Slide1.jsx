import React, { useState, useEffect } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie1 from '../../assets/movies/tour_1_analysis.mov'


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
    },
    subHeading: {
      margin: '1em',
      marginTop: 0,
    },
  }),
)

const Slide1 = () => {
  const classes = useStyles()

  return (
    <>
      <video style={{border: '1px solid #d6d6d6'}} src={tourMovie1} muted width="725" height="400" autoplay="autoplay"  controls loop>
      </video>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '3.13953488vh' }}>
          Analysis
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '10px' }}>
        Access 4 different analysis using the tabs in the top left bar
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh' }}>
        Mouse-over on each tab for details
        </Typography>
      </div>
    </>
  )
}

export default Slide1
