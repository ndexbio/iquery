import React from 'react'
import './style.css'

// SVG images for links
import cyLogo from '../../assets/images/cytoscape-logo.svg'
import ndexLogo from '../../assets/images/ndex-logo.svg'
import ucsdLogo from '../../assets/images/ucsd-logo.svg'

import Typography from '@material-ui/core/Typography'

const Footer = props => (
  <footer className="footer-container">
    <Typography variant="subtitle1">
      &copy; 2019 UC, San Diego Ideker Lab
    </Typography>
    <img
      alt="NDEx logo"
      src={ndexLogo}
      className="footer-logo"
      onClick={() => openLink(NDEX_URL)}
    />
    <img
      alt="Cytoscape logo"
      src={cyLogo}
      className="footer-logo"
      onClick={() => openLink(CY_URL)}
    />
    <img
      alt="UCSD logo"
      src={ucsdLogo}
      className="footer-logo"
      onClick={() => openLink(UCSD_URL)}
    />
  </footer>
)

const CY_URL = 'https://cytoscape.org/'
const NDEX_URL = 'https://www.ndexbio.org/'
const UCSD_URL =
  'https://medschool.ucsd.edu/som/medicine/research/labs/ideker/Pages/default.aspx'

const openLink = url => {
  window.open(url, '_blank')
}

export default Footer
