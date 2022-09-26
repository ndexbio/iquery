import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import base from '../../../assets/images/base_network.png'
import neighborhood from '../../../assets/images/neighborhood_network.png'
import adjacent from '../../../assets/images/adjacent_network.png'
import direct from '../../../assets/images/direct_network.png'
import interconnect from '../../../assets/images/interconnect_network.png'

const useStyles = makeStyles({
  root: {
    padding: '2em',
  },
  message: {
    padding: '2em',
    display: 'grid',
    placeItems: 'center center',
  },
  dialogTitle: {
    '& h2': {
      display: 'flex',
      flexDirection: 'row',
    },
    cursor: 'move',
  },
  iconButton: {
    padding: '0 !important',
    width: '2rem',
    height: '2rem',
  },
  title: {
    flexGrow: 1,
  },
  flexRowContainerOuter: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: '2em',
    justifyContent: 'center',
  },
  flexRowContainerInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '40em',
    minHeight: '10em',
  },
  flexColumnContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1em',
  },
  flexRowItemOuter: {
    minWidth: '25em',
    flexGrow: 1,
    flexBasis: 'calc(50% - 1em)',
    maxWidth: '40em',
  },
  flexRowItemInner: {},
  flexColumnItem: {},
  image: {
    height: '10em',
    marginLeft: '1em',
  },
})

const PaperComponent = (props) => {
  const classes = useStyles()
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}


const NDExQueryHelpDialog = (props) => {
  const classes = useStyles()
  const { onClose, open } = props

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <Dialog
        className={classes.root}
        onClose={handleClose}
        aria-labelledby="search-help-dialog-title"
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
      >
        <DialogTitle id="search-help" className={classes.dialogTitle}>
          <Typography variant="h6" className={classes.title}>
            Network Query Modes
          </Typography>
          <IconButton aria-haspopup="true" onClick={handleClose} className={classes.iconButton}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText color="textPrimary">
            <div className={classes.flexRowContainerOuter}>
              <div className={[classes.flexColumnContainer, classes.flexRowItemOuter].join(' ')}>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <br />
                      This section explains briefly all the available types of query using the simple example network
                      pictured to the right. In the examples below, the orange node(s) indicate the query terms while
                      blue nodes and edges identify the retrieved subnetwork.
                    </Typography>
                  </div>
                  <div className={classes.flexRowItemInner}>
                    <img src={base} className={classes.image} />
                  </div>
                </div>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <strong>Neighborhood:</strong>
                    </Typography>
                    <Typography variant="body2">
                      Returns all the nodes connected to the query term(s) and all edges between these nodes. For
                      example, querying the network for "B" (orange node), will return the subnetwork highlighted in
                      blue.
                    </Typography>
                  </div>
                  <div className={classes.flexRowItemInner}>
                    <img src={neighborhood} className={classes.image} />
                  </div>
                </div>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <Typography variant="body2">
                        <strong>Adjacent:</strong>
                      </Typography>
                      Returns all nodes connected to the query term(s) and only the edges between these nodes and the
                      query term(s). In this case querying the network for "B" will return a smaller subnetwork.{' '}
                    </Typography>
                  </div>
                  <div className={classes.flexRowItemInner}>
                    <img src={adjacent} className={classes.image} />
                  </div>
                </div>
              </div>
              <div className={[classes.flexColumnContainer, classes.flexRowItemOuter].join(' ')}>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <Typography variant="body2">
                        <strong>Direct: </strong>
                      </Typography>
                      Returns all edges between the query terms. This type of query requires at least 2 terms (or use of
                      wildcards). Querying for "A" and "B" returns only the connection between them.
                    </Typography>
                  </div>
                  <div className={classes.flexRowItemInner}>
                    <img src={direct} className={classes.image} />
                  </div>
                </div>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <Typography variant="body2">
                        <strong>Interconnect:</strong>
                      </Typography>
                      Returns all edges connecting the query terms and including up to one intermediate node. Also for
                      this type of query at least 2 terms (or use of wildcards) are required. In this case, querying for
                      "A" and "B" returns the subnetwork highlighted in blue.{' '}
                    </Typography>
                  </div>
                  <div className={classes.flexRowItemInner}>
                    <img src={interconnect} className={classes.image} />
                  </div>
                </div>
                <div className={[classes.flexRowContainerInner, classes.flexColumnItem].join(' ')}>
                  <div className={classes.flexRowItemInner}>
                    <Typography variant="body2">
                      <strong>1-step</strong> and <strong>2-step</strong> indicate the depth of the traversal query and
                      only apply to Neighborhood and Adjacent queries.
                    </Typography>
                    <Typography variant="body2">
                      <br />
                      For more info, please review the manual on{' '}
                      <a href="https://home.ndexbio.org/finding-and-querying-networks/" target="_blank" rel="noreferrer">
                        Finding and Querying Networks in NDEx
                      </a>
                      .
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NDExQueryHelpDialog
