const NDEX_BASE_URL = 'http://public.ndexbio.org/v2/'

const METHOD_POST = 'POST'

export const searchNetwork = async query => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify(query)
  const searchUrl = NDEX_BASE_URL + 'search/network'

  return await fetch(searchUrl, {
    method: METHOD_POST,
    headers,
    body
  })
}
