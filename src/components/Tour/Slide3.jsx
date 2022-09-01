import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie3 from '../../assets/images/tourImages/tour_3_results.gif'

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

const Slide3 = () => {
  const classes = useStyles()

  return (
    <>
      <img src={tourMovie3} style={{border: '1.5px solid #0088D2', height: '75%', width: 'auto', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginBottom: '5px'}}>
      </img>  
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '1.1rem' }}>
          Search Results
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '5px' }}>
        - Scroll down to browse the results
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginBottom: '5px' }}>
        - Click a result to display it
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginBottom: '5px' }}>
        - Matched query genes are shown in red, normalized genes in orange and invalid genes strikethrough
        </Typography>
      </div>
    </>
  )
}

export default Slide3
