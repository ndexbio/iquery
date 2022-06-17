import React, { useState } from 'react'

import { createStyles, makeStyles, withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import imageA from '../../assets/images/tourImages/Frame 5a.png'
import imageB from '../../assets/images/tourImages/Frame 5b.png'
import imageC from '../../assets/images/tourImages/Frame 5c.png'
import imageD from '../../assets/images/tourImages/Frame 5d.gif'

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
    heading: {
      fontWeight: 500,
      marginBottom: '0.75em',
    },
    textContainer: {
      marginBottom: '1em',
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

const Slide4 = () => {
  const classes = useStyles()
  const [currentDisplay, setCurrentDisplay] = useState(3)
  const images = [
    <img src={imageA} className={classes.image} />,
    <img src={imageB} className={classes.image} />,
    <img src={imageC} className={classes.image} />,
    <img src={imageD} className={classes.image} />,
  ]

  return (
    <>
      <div className={classes.imageContainer}>{images[currentDisplay]}</div>
      <div className={classes.textContainer}>
        <Typography
          component="div"
          variant="h5"
          color="textPrimary"
          className={classes.heading}
          style={{ fontSize: '3.13953488vh' }}
        >
          Search bar
        </Typography>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(3)
          }}
        >
          <AccordionSummary>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              <strong>Search</strong> for genes and systems in the hierarchical model.
            </Typography>
          </AccordionSummary>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(2)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Click the gear button to change the <strong>type of search</strong>.
            </Typography>
            <br />
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Learn more about <strong>types of searches</strong>.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography component="div" style={{ fontSize: '2.09302326vh' }}>
              <ul>
                <li>Exact match (for genes): Will find genes that match the search terms exactly.</li>
                <li>
                  Prefix match (for genes and systems): Will find genes and systems that start with the search terms.
                </li>
                <li>Fuzzy match (for systems): Will find systems whose names contain the search terms.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          onMouseEnter={() => {
            setCurrentDisplay(1)
          }}
          onMouseLeave={() => {
            setCurrentDisplay(0)
          }}
        >
          <AccordionSummary>
            <Typography style={{ fontSize: '2.09302326vh' }}>
              Click the hamburger menu to open the <strong>Control Panel</strong>.
            </Typography>
          </AccordionSummary>
        </Accordion>
      </div>
    </>
  )
}

export default Slide4
