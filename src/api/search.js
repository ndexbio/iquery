import { METHOD_GET, METHOD_POST } from './apiConstants'

const SEARCH_BASE_URL =
  'http://secret.ndexbio.org/fake_cytoscapesearch/rest/v1/cytoscapesearch/'

const getSource = () => {
  const searchUrl = SEARCH_BASE_URL + 'source'
  console.log('Calling sources:', searchUrl)

  return fetch(searchUrl, {
    method: METHOD_GET,
    mode: 'cors'
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch source list:' + response.status)
      }
      return response
    })
    .catch(error => ({ error }))
}

const SOURCES = []
const BASE_QUERY = {
  geneList: [],
  sourceList: ['enrichment', 'interactome', 'keyword']
}

const postQuery = query => {
  const searchUrl = SEARCH_BASE_URL

  console.log('Calling SEARCH API:', searchUrl)

  return fetch(searchUrl, {
    method: METHOD_POST,
    mode: 'cors'
  })
}

const FAKE_RESULT_URL =
  'http://secret.ndexbio.org/fake_cytoscapesearch/rest/v1/cytoscapesearch/'
const FAKE_UUID = 'bb50d9cd-b40c-45ab-965c-4b7c7d1bdb5f'

const getResult = searchId => {
  // const searchUrl = SEARCH_BASE_URL + searchId
  const searchUrl = FAKE_RESULT_URL + FAKE_UUID

  console.log('Calling SEARCH API:', searchUrl)

  return fetch(searchUrl, {
    method: METHOD_GET,
    mode: 'cors'
  })
}

export { getResult, getSource }
