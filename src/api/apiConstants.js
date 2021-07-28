export const METHOD_POST = 'POST';
export const METHOD_GET = 'GET';

export const CYREST_BASE_URL = 'http://127.0.0.1'

export const MYGENE_BASE_URL = 'https://mygene.info/v3/query'

export const GENE_CARDS_URL = 'https://www.genecards.org/cgi-bin/carddisp.pl?gene='


export const HELP_URL =
'https://github.com/cytoscape/search-portal/blob/master/README.md';

export const FEEDBACK_URL = 'https://home.ndexbio.org/contact-us/'
export const NDEX_URL = 'https://ndexbio.org'
export const CYTOSCAPE_URL = 'https://cytoscape.org'


/* public */
/*
//Server URL
export const DEPLOY_ENVIRON = ''
export const SERVICE_SERVER_URL = 'https://public.ndexbio.org/';
//Its endpoint
export const BASE_URL = SERVICE_SERVER_URL + 'integratedsearch/v1/';
//Save to NDEx google SSO client ID
export const GOOGLE_CLIENT_ID =
  '802839698598-8rsr8va0bd0e6lmi0ghemtrvldk9rnla.apps.googleusercontent.com';
*/
/* test */
/*
//Server URL
export const DEPLOY_ENVIRON = ' on test'

export const SERVICE_SERVER_URL = 'https://test.ndexbio.org/';
//Its endpoint
export const BASE_URL = SERVICE_SERVER_URL + 'integratedsearch/v1/';
//Save to NDEx google SSO client ID
export const GOOGLE_CLIENT_ID =
  '802839698598-shh458t46bo9v2v5iolcvk1h443hid6n.apps.googleusercontent.com';
*/

/* dev */
export const DEPLOY_ENVIRON = ' on dev'
//Server URL
export const SERVICE_SERVER_URL = 'https://dev.ndexbio.org/';
//Its endpoint
export const BASE_URL = SERVICE_SERVER_URL + 'integratedsearch/v1/';
//Save to NDEx google SSO client ID
export const GOOGLE_CLIENT_ID =
  '802839698598-mrrd3iq3jl06n6c2fo1pmmc8uugt9ukq.apps.googleusercontent.com';

/* local */
/*
//Server URL
export const SERVICE_SERVER_URL = 'http://localhost:8080/';
//Its endpoint
export const BASE_URL = SERVICE_SERVER_URL + 'v1/';
//Save to NDEx google SSO client ID
export const GOOGLE_CLIENT_ID =
  '802839698598-8rsr8va0bd0e6lmi0ghemtrvldk9rnla.apps.googleusercontent.com';
*/

// Version of IQuery shown on main landing page of App
export const APP_VERSION = 'v1.3 beta' + DEPLOY_ENVIRON