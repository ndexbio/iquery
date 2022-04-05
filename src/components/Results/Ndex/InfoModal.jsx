import React, { useState } from 'react'

import { Tooltip } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Paper from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const infoStyle = {
  // position: 'relative',
  // left: '0.5em',
  // top: '6px',
  // height: '0.5em',
  // width: '0.5em'
}

const iconStyle = {
  height: '0.7em',
  width: '0.7em',
  // position: 'relative',
  // bottom: '2px',
  color: '#3576BE'
}

const PaperComponent = props => {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  )
}

const InfoModal = props => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const infoTooltip = (
    <div>
      <div>{`Similarity: rare genes in common between the network and query gene list produce a higher score than common genes`}</div>
      <br/>
      <div>{`Overlap: the number of genes in common between the query gene list and the network`}</div>
    </div>
  )
  return (
    <React.Fragment>
      <Tooltip title={infoTooltip} placement='bottom'>
        <IconButton aria-haspopup="true" onClick={handleOpen} style={infoStyle}>
          <InfoIcon style={iconStyle} />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Typography component="span" variant="h6">
            Sorting
          </Typography>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText component="span">
          <Typography component="div" variant="h6" color="textPrimary">
              Similarity:
            </Typography>
            <Typography component="div" variant="body2">
              This is a way of scoring the similarity between the query set and
              the genes in the network, while taking into account that some
              genes are much more universal than other genes, and will appear in
              many more networks without adding much information. This is based
              on cosine similarity, using values derived from the{' '}
              <a
                href="https://ethen8181.github.io/machine-learning/clustering_old/tf_idf/tf_idf.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Term Frequency-Inverse Document Frequency
              </a>{' '}
              of each gene in the query set and the network. Rare genes that are
              shared between the query set and network will contribute more to
              the similarity score than common genes, resulting in a higher
              similarity score. When sorting by similarity, networks that have
              high similarity are at the top of the list, and networks that have
              low similarity are at the bottom of the list.{' '}
            </Typography>
            <br />
            <Typography component="div" variant="h6" color="textPrimary">
              Overlap:
            </Typography>
            <Typography component="div" variant="body2">
              This refers to the number of genes that are in both the query set
              and the network. When sorting by overlap, networks with a high
              number of overlapping genes are at the top of the list, and
              networks with a low number of overlapping genes are at the bottom
              of the list.{' '}
              <Typography
                component="span"
                variant="inherit"
                color="textPrimary"
              >
                <strong>Sorting is stable</strong>
              </Typography>
              , so sorting by <em>p</em>-value and then by overlap will result
              in a list where networks are sorted by overlap, and networks that
              are tied for overlap are sorted by <em>p</em>-value.
            </Typography>
            {/* <Typography component="div" variant="h6" color="textPrimary">
              <em>P</em>-Value:
            </Typography>
            <Typography component="div" variant="body2">
              This refers to the probability that the query set and the network
              overlap, to the extent that they do or to a greater extent, by
              chance. Here, it is calculated using the complementary cumulative
              distribution function of a{' '}
              <a
                href="https://en.wikipedia.org/wiki/Hypergeometric_distribution"
                target="_blank"
                rel="noopener noreferrer"
              >
                hypergeometric distribution
              </a>
              , where:
              <ul>
                <li>
                  The population size (<em>N</em>) is equal to the number of
                  genes in the entire database;
                </li>
                <li>
                  The number of success states in the population (<em>K</em>) is
                  equal to the number of genes in the network;
                </li>
                <li>
                  The sample size (<em>n</em>) is equal to the size of the
                  network; and
                </li>
                <li>
                  The number of observed successes (<em>k</em>) is equal to the
                  number of genes that are in both the query set and the
                  network.
                </li>
              </ul>
              Then the <em>p</em>-values are adjusted to compensate for the high
              false discovery rate that is an effect of querying a large
              database of networks. This is done using the{' '}
              <a
                href="http://www.jstor.org/stable/2346101"
                target="_blank"
                rel="noopener noreferrer"
              >
                Benjamini-Hochberg method
              </a>
              , where each <em>p</em>-value is multiplied by the number of
              networks queried, and then divided by its rank relative to other{' '}
              <em>p</em>-values (where low <em>p</em>-values have a low rank and
              vice versa). When sorting by <em>p</em>-value, networks with a low{' '}
              <em>p</em>-value are at the top of the list, and networks with a
              high <em>p</em>-value are at the bottom of the list.{' '}
              <a
                href="https://github.com/ndexbio/ndex-enrichment-rest/wiki/How-Pvalue-is-calculated"
                target="_blank"
                rel="noopener noreferrer"
              >
                For implementation details, click here
              </a>
              .
            </Typography>
            <br /> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default InfoModal
