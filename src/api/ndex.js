const NDEX_BASE_URL = 'http://public.ndexbio.org/v2/'

const METHOD_POST = 'POST'

const searchNetwork = query => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({
    searchString: query
  })
  const searchUrl = NDEX_BASE_URL + 'search/network'

  console.log('Calling NDEx API:', query, body, searchUrl)

  return fetch(searchUrl, {
    method: METHOD_POST,
    headers,
    body
  })
}

export { searchNetwork }
