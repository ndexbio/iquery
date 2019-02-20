import { METHOD_GET, METHOD_POST } from './apiConstants'
const NDEX_BASE_URL = 'http://public.ndexbio.org/v2/'

const searchNetwork = query => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    searchString: query
  })
  const searchUrl = NDEX_BASE_URL + 'search/network'

  console.log('*******Calling NDEx API:', query, body, searchUrl)

  return fetch(searchUrl, {
    method: METHOD_POST,
    headers,
    body
  })
}

const fetchNetwork = uuid => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const fetchUrl = NDEX_BASE_URL + 'network/' + uuid

  console.log('Calling CX API:', uuid, fetchUrl)

  return fetch(fetchUrl, {
    method: METHOD_GET,
    headers
  })
}

export { searchNetwork, fetchNetwork }
