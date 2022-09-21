import React, { useState, useEffect } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import { TOUR_IMAGES } from '../../api/config'
const tourMovie1 = TOUR_IMAGES[0]

const useStyles = makeStyles((theme) =>
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
      <img
        src={tourMovie1}
        style={{
          border: '1.5px solid #0088D2',
          height: '50%',
          width: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '5px',
        }}
      ></img>
      <div className={classes.textContainer}>
        <Typography variant="h5" color="textPrimary" className={classes.heading} style={{ fontSize: '1.1rem' }}>
          Analysis
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh', marginTop: '5px', marginBottom: '10px' }}>
          - Access 4 different analysis using the tabs in the top left bar
        </Typography>
        <Typography style={{ fontSize: '2.09302326vh' }}>- Mouse-over on each tab for details</Typography>
      </div>
    </>
  )
}

export default Slide1
