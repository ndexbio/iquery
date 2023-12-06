export const METHOD_POST = 'POST'
export const METHOD_GET = 'GET'

export const CYREST_BASE_URL = 'http://127.0.0.1'

var HIGHLIGHT_GENES = false
var MAX_NETWORK_SIZE = 5000
var MYGENE_BASE_URL = 'https://mygene.info/v3/query'
var VALIDATE_GENES_WITH_MYGENE = true

var NDEX_URL = 'https://dev.ndexbio.org'

var GENE_CARDS_URL = 'https://www.genecards.org/cgi-bin/carddisp.pl?gene='
var HELP_URL = 'https://github.com/cytoscape/search-portal/blob/master/README.md'

var FEEDBACK_URL = 'https://home.ndexbio.org/contact-us/'
var CYTOSCAPE_URL = 'https://cytoscape.org'
var DEPLOY_ENVIRON = ' on localhost'
var SERVICE_SERVER_URL = 'https://dev.ndexbio.org/v2'
var BASE_URL = 'https://dev.ndexbio.org/integratedsearch/v1/'
var GOOGLE_ANALYTICS_ID = 'G-H5SCGJLM7Z'
var COPYRIGHT =
  'Copyright © 2013-@@YEAR@@, The Regents of University of California, The Cytoscape Consortium. All rights reserved.'
var UCSD_URL = 'https://medschool.ucsd.edu/som/medicine/research/labs/ideker/Pages/default.aspx'
var GENESET_EXAMPLES = [
  {
    name: 'Hypoxia',
    genes:
      'ADM ADORA2B AK4 AKAP12 ALDOA ALDOB ALDOC AMPD3 ANGPTL4 ANKZF1 ANXA2 ATF3 ATP7A B3GALT6 B4GALNT2 BCAN BCL2 BGN BHLHE40 BNIP3L BRS3 BTG1 CA12 CASP6 CAV1 CCNG2 CCRN4L CDKN1A CDKN1B CDKN1C CHST2 CHST3 CITED2 COL5A1 CP CSRP2 CTGF CXCR4 CXCR7 CYR61 DCN DDIT3 DDIT4 DPYSL4 DTNA DUSP1 EDN2 EFNA1 EFNA3 EGFR ENO1 ENO2 ENO3 ERO1L ERRFI1 ETS1 EXT1 F3 FAM162A FBP1 FOS FOSL2 FOXO3 GAA GALK1 GAPDH GAPDHS GBE1 GCK GCNT2 GLRX GPC1 GPC3 GPC4 GPI GRHPR GYS1 HAS1 HDLBP HEXA HK1 HK2 HMOX1 HOXB9 HS3ST1 HSPA5 IDS IER3 IGFBP1 IGFBP3 IL6 ILVBL INHA IRS2 ISG20 JMJD6 JUN KDELR3 KDM3A KIF5A KLF6 KLF7 KLHL24 LALBA LARGE LDHA LDHC LOX LXN MAFF MAP3K1 MIF MT1E MT2A MXI1 MYH9 NAGK NCAN NDRG1 NDST1 NDST2 NEDD4L NFIL3 NR3C1 P4HA1 P4HA2 PAM PCK1 PDGFB PDK1 PDK3 PFKFB3 PFKL PFKP PGAM2 PGF PGK1 PGM1 PGM2 PHKG1 PIM1 PKLR PKP1 PLAC8 PLAUR PLIN2 PNRC1 PPARGC1A PPFIA4 PPP1R15A PPP1R3C PRDX5 PRKCA PRKCDBP PTRF PYGM RBPJ RORA RRAGD S100A4 SAP30 SCARB1 SDC2 SDC3 SDC4 SELENBP1 SERPINE1 SIAH2 SLC25A1 SLC2A1 SLC2A3 SLC2A5 SLC37A4 SLC6A6 SRPX STBD1 STC1 STC2 SULT2B1 TES TGFB3 TGFBI TGM2 TIPARP TKTL1 TMEM45A TNFAIP3 TPBG TPD52 TPI1 TPST2 UGP2 VEGFA VHL VLDLR WISP2 WSB1 XPNPEP1 ZFP36 ZNF292',
    description: 'The 200 genes comprising the MSigDB Hallmark Gene Set for Hypoxia',
  },
]
var DEFAULT_SORT = 'Similarity'
var HIDE_SEARCHBAR = false
var HIDE_VIEW_SOURCE_IN_NDEX_BUTTON = false
var HIDE_SAVE_TO_NDEX_BUTTON = false

var SOURCE_NAMES = ['enrichment', 'pathwayfigures', 'indra', 'ccmi']

var PROTEIN_INTERACTIONS_NETWORKS = [
  '038fcfcf-e757-11ec-8bfe-0242c246b7fb',
  'b6e6451f-ff67-11ea-819c-525400c25d22',
  'abd741f7-fe93-11ea-819c-525400c25d22',
  'c0315eba-3fa7-11e9-a05d-525400c25d22',
  '86827cf7-1759-11ed-9208-0242c246b7fb',
  '369e5ec4-1759-11ed-9208-0242c246b7fb',
]

var TOUR_IMAGES = [
  'https://home.ndexbio.org/iquerytutorials/tour_1_analysis.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_2_sorting.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_3_results.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_4_info.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_5_toolbar.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_6_annotations-2.gif',
  'https://home.ndexbio.org/iquerytutorials/tour_7_takethetour.png',
]

var LANDING_PAGE_TEXT = 'One search finds a variety of pathways and interaction networks relevant to your set of genes.'

var KEYCLOAK_CONFIG = {
  url: 'https://dev.ndexbio.org/auth2',
  realm: 'ndex',
  clientId: 'localtestclient',
}

if (window.ndexSettings === undefined) {
  console.log('ndexSettings is not defined. Using dummy config')
} else {
  if (window.ndexSettings.iQuery === undefined) {
    console.log('ndexSettings.iQuery is not defined. Using dummy config')
  } else {
    MYGENE_BASE_URL = window.ndexSettings.iQuery.myGeneUri
    GENE_CARDS_URL = window.ndexSettings.iQuery.geneCardsUri
    HELP_URL = window.ndexSettings.iQuery.helpUri
    FEEDBACK_URL = window.ndexSettings.iQuery.feedBackUri
    CYTOSCAPE_URL = window.ndexSettings.iQuery.cytoscapeUri
    DEPLOY_ENVIRON = window.ndexSettings.iQuery.deployEnvironment
    SERVICE_SERVER_URL = window.ndexSettings.ndexServerUri
    BASE_URL = window.ndexSettings.iQuery.baseUri
    GOOGLE_ANALYTICS_ID = window.ndexSettings.iQuery.googleAnalyticsId
    GENESET_EXAMPLES = window.ndexSettings.iQuery.geneSetExamples
    UCSD_URL = window.ndexSettings.iQuery.ucsdUri
    COPYRIGHT = window.ndexSettings.iQuery.copyRight
    MAX_NETWORK_SIZE = window.ndexSettings.iQuery.maxNetworkSize
    HIGHLIGHT_GENES = window.ndexSettings.iQuery.highlightGenes
    DEFAULT_SORT = window.ndexSettings.iQuery.defaultSort
    HIDE_SEARCHBAR = window.ndexSettings.iQuery.hideSearchBar
    VALIDATE_GENES_WITH_MYGENE = window.ndexSettings.iQuery.validateGenesWithMyGene
    HIDE_VIEW_SOURCE_IN_NDEX_BUTTON = window.ndexSettings.iQuery.hideViewSourceInNdexButton
    HIDE_SAVE_TO_NDEX_BUTTON = window.ndexSettings.iQuery.hideSaveToNdexButton
    PROTEIN_INTERACTIONS_NETWORKS = window.ndexSettings.iQuery.proteinInteractionsNetworks
    TOUR_IMAGES = window.ndexSettings.iQuery.tourImages
    LANDING_PAGE_TEXT = window.ndexSettings.iQuery.landingPageText
    NDEX_URL = window.ndexSettings.iQuery.ndexUri
    SOURCE_NAMES = window.ndexSettings.iQuery.sourceNames
    KEYCLOAK_CONFIG = window.ndexSettings.iQuery.keycloakConfig
  }
}

// Version of IQuery shown on main landing page of App
var APP_VERSION = 'v1.4' + DEPLOY_ENVIRON

// As requested in UD-1954 if @@YEAR@@ is in copyright string replace it with
// current year
if (COPYRIGHT !== undefined && COPYRIGHT !== null) {
  COPYRIGHT = COPYRIGHT.replace('@@YEAR@@', new Date().getFullYear().toString())
}

export {
  KEYCLOAK_CONFIG,
  PROTEIN_INTERACTIONS_NETWORKS,
  MYGENE_BASE_URL,
  GENE_CARDS_URL,
  HELP_URL,
  FEEDBACK_URL,
  CYTOSCAPE_URL,
  GOOGLE_ANALYTICS_ID,
  BASE_URL,
  SERVICE_SERVER_URL,
  DEPLOY_ENVIRON,
  APP_VERSION,
  GENESET_EXAMPLES,
  UCSD_URL,
  COPYRIGHT,
  MAX_NETWORK_SIZE,
  HIGHLIGHT_GENES,
  DEFAULT_SORT,
  HIDE_SEARCHBAR,
  VALIDATE_GENES_WITH_MYGENE,
  HIDE_VIEW_SOURCE_IN_NDEX_BUTTON,
  HIDE_SAVE_TO_NDEX_BUTTON,
  TOUR_IMAGES,
  LANDING_PAGE_TEXT,
  NDEX_URL,
  SOURCE_NAMES,
}
