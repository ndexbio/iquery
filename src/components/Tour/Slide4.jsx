import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie4 from '../../assets/movies/tour_4_info.mov'

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


const Slide4 = () => {
  const classes = useStyles()

  return (
    <>
      <video src={tourMovie4} style={{border: '1px solid #d6d6d6'}}  width="725" height="400" muted autoplay="autoplay"  controls loop>
      </video>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '3.13953488vh' }}>
          Result's Info
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '10px' }}>
        Click the pathway name to display its description, reference and other metadata.
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh' }}>
        You can also browse the nodes and edges in tabular form using the related tabs.
        </Typography>
      </div>
    </>
  )
}

export default Slide4