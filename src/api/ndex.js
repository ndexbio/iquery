import { METHOD_GET, METHOD_POST } from './apiConstants'
const NDEX_BASE_URL = 'http://public.ndexbio.org/v2/'

// const SEARCH_BASE_URL = 'http://public.ndexbio.org/v2/'
const SEARCH_BASE_URL = 'http://secret.ndexbio.org:8090/'

const searchNetwork = query => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    searchString: query
  })
  const searchUrl = NDEX_BASE_URL + 'search/network'

  return fetch(searchUrl, {
    method: METHOD_POST,
    headers,
    body
  })
}

const fetchNetwork = (id, sourceUUID, networkUUID) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const fetchUrl =
    SEARCH_BASE_URL +
    id +
    '/overlaynetwork?sourceUUID=' +
    sourceUUID +
    '&networkUUID=' +
    networkUUID

  console.log('Calling CX API:', fetchUrl)

  return fetch(fetchUrl, {
    method: METHOD_GET,
    headers
  })
}

export { searchNetwork, fetchNetwork }
