import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import imageA1 from '../../assets/images/tourImages/Frame 6a1.gif'
import imageA2 from '../../assets/images/tourImages/Frame 6a2.gif'
import imageB from '../../assets/images/tourImages/Frame 6b.png'
import imageC from '../../assets/images/tourImages/Frame 6c.png'
import imageD from '../../assets/images/tourImages/Frame 6d.png'

const useStyles = makeStyles(theme =>
  createStyles({
    image: {
      //height: '35em',
      height: '73.2558141vh',
    },
    imageContainer: {
      display: 'flex',
      margin: 'auto',
    },
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
      marginLeft: '0.66667em',
    },
    slideContainer: {
      display: 'flex',
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
    },
    iconContainer: {
      display: 'flex',
      alignItems: 'end',
      height: '100%',
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
    display: 'flex',
    alignItems: 'flex-end',
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
    display: 'block',
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

const Slide5 = () => {
  const classes = useStyles()
  const [currentDisplay, setCurrentDisplay] = useState(0)
  const images = [
    <img
      src={imageA1}
      className={classes.image}
      onMouseEnter={() => {
        setCurrentDisplay(1)
      }}
    />,
    <img
      src={imageA2}
      className={classes.image}
      onMouseEnter={() => {
        setCurrentDisplay(0)
      }}
    />,
    <img
      src={imageB}
      className={classes.image}
      onMouseEnter={() => {
        if (currentDisplay == 0) {
          setCurrentDisplay(1)
        } else {
          setCurrentDisplay(0)
        }
      }}
    />,
    <img src={imageC} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  return (
    <div className={classes.slideContainer}>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div className={classes.textContainer}>
        <Typography
          component="div"
          variant="h5"
          color="textPrimary"
          className={classes.heading}
          style={{ fontSize: '3.13953488vh' }}
        >
          Control Panel
        </Typography>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(3)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(2)
          }}
        >
          <AccordionSummary>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              The <strong>Control Panel</strong> lets you change the Model View's look.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(4)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(2)
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Turn on the <strong>Enrichment Option</strong> to automatically run gene set enrichment analysis
            </Typography>
            <br />
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Learn more about <strong>enrichment</strong>.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              When the enrichment setting is turned on, double clicking a system will trigger a gene set enrichment
              analysis using a few major biological databases. This will show what kinds of genes are overrepresented in
              the system.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default Slide5
