import React from 'react'
import './style.css'

import { CYTOSCAPE_URL, UCSD_URL, COPYRIGHT } from '../../api/config'

// SVG images for links
import cyLogo from '../../assets/images/cytoscape-logo.svg'
import ndexLogo from '../../assets/images/ndex-logo.svg'
import ucsdLogo from '../../assets/images/ucsd-logo.svg'

import Typography from '@material-ui/core/Typography'

const Footer = props => (
  <footer className="footer-container">
    <Typography variant="subtitle1">
      {COPYRIGHT}
    </Typography>
    <img
      alt="NDEx logo"
      src={ndexLogo}
      className="footer-logo"
      onClick={() => openLink("/")}
    />
    <img
      alt="Cytoscape logo"
      src={cyLogo}
      className="footer-logo"
      onClick={() => openLink(CYTOSCAPE_URL)}
    />
    <img
      alt="UCSD logo"
      src={ucsdLogo}
      className="footer-logo"
      onClick={() => openLink(UCSD_URL)}
    />
  </footer>
)

const openLink = url => {
  window.open(url, '_blank')
}

export default Footer
