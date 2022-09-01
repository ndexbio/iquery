import React, { useState, useEffect } from 'react'
import { CSSProperties } from '@material-ui/styles'

// Conversion table from tab ID to human-readable labels
const tooltipStyle: CSSProperties = {
  textAlign: 'center',
}

const PresetDataSources = {
  enrichment: {
    label: 'Relevant Pathways',
    tooltip: (
      <div style={tooltipStyle}>
        Selected curated and experimentally derived pathways <br />
        (NCI-PID, Signor 2.0, etc.)
      </div>
    ),
  },
  'interactome-ppi': {
    label: 'Protein Interactions',
    tooltip: <div style={tooltipStyle}>PPI networks from several sources (BioGRID, STRING, etc.)</div>,
  },
  'interactome-association': {
    label: 'Gene Association',
    tooltip: (
      <div style={tooltipStyle}>
        Drug, disease and other gene-association networks <br />
        (CTD, HPA, etc.)
      </div>
    ),
  },
  pathwayfigures: {
    label: 'Pathway Figures',
    tooltip: (
      <div style={tooltipStyle}>
        Node-only networks generated by optical recognition of published figures (courtesy of the WikiPathways team)
      </div>
    ),
  },
  indra: {
    label: 'INDRA GO',
    tooltip: (
      <div style={tooltipStyle}>
        Collection of machine-curated pathways generated with the INDRA engine (courtesy of the Sorger Lab)
      </div>
    ),
  },
  'protein-interactions': {
    label: 'Protein Interactions',
    tooltip: <div style={tooltipStyle}>Protein-protein interaction networks from several sources (BioGRID, STRING, etc.)</div>,
  }
}

export { PresetDataSources }
