import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'

import tourMovie2 from '../../assets/movies/tour_2_sorting.mov'

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

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    margin: '0 1em',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 1em',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
    },
    '&:hover': {
      backgroundColor: '#FAFAB9',
    },
  },
  content: {
    margin: '0.375em 0',
    '&$expanded': {
      margin: '0.375em 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const Slide1 = () => {
  const classes = useStyles()

  return (
    <>
      <video src={tourMovie2} style={{border: '1px solid #d6d6d6'}}  width="725" height="400" muted autoplay="autoplay"  controls loop>
      </video>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '3.13953488vh' }}>
          Sorting Options
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '10px' }}>
          Use the radio buttons to change the sorting method.
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh' }}>
        Click the blue  icon for details about the available options.
        </Typography>
      </div>
    </>
  )
}

export default Slide1
