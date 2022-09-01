import React, { useState } from 'react'

import { createStyles, makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import HelpIcon from '@material-ui/icons/HelpOutlineOutlined'
import { Checkbox } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';

import { setTourDisabled, getTourDisabled } from './check-visitor';

import imageA from '../../assets/images/tourImages/tour_7_takethetour.png'

const useStyles = makeStyles(theme =>
  createStyles({
    imageContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      //width: '22em',
      margin: '0.5em 0 2em',
      border: '1.5px solid #0088D2'
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
      whiteSpace: 'nowrap',
      display: 'inline-block',
    },
    icon: {
      top: '0.25rem',
      position: 'relative',
    },
  }),
)

const Slide6 = () => {
  const classes = useStyles()
  const [disableTour, setDisableTour] = useState(getTourDisabled());

  const toggleDisableTour = () => {
    setTourDisabled(!disableTour)
    setDisableTour(!disableTour)
  }

  return (
    <>
      <div className={classes.imageContainer}>{<img src={imageA} className={classes.image} />}</div>

      <Typography color="textPrimary" style={{ fontSize: '2.09302326vh', marginBottom: '1em' }}>
      Take this tour again anytime by clicking the black  icon in the top right corner.
      </Typography>
      <FormControlLabel
          value="left"
          control={<Checkbox checked={disableTour} color="primary" onClick={toggleDisableTour}/>}
          label="Don't show this again"
          labelPlacement="left"
        />
    </>
  )
}

export default Slide6
