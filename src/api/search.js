import { METHOD_GET, METHOD_POST } from './apiConstants'

const SEARCH_BASE_URL =
  'http://secret.ndexbio.org/fake_cytoscapesearch/rest/v1/cytoscapesearch/'

/**
 * Check the status of the services.
 *
 * @returns {Promise<Response | never | {error: any}>}
 */
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

const checkStatus = jobId => {
  const checkJobStatusUrl = SEARCH_BASE_URL + jobId + '/status'

  return fetch(checkJobStatusUrl, {
    method: METHOD_GET
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch source list:' + response.status)
      }
      return response
    })
    .catch(error => ({ error }))
}

const getResult = jobId => {
  const resultUrl = SEARCH_BASE_URL + jobId

  return fetch(resultUrl, {
    method: METHOD_GET
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to fetch search result:' + response.status)
      }
      return response
    })
    .catch(error => ({ error }))
}

const postQuery = (geneList, sourceList) => {
  const searchUrl = SEARCH_BASE_URL

  const queryObject = {
    geneList,
    sourceList
  }

  console.log('Sending query to search service:', queryObject)

  return fetch(searchUrl, {
    method: METHOD_POST,
    body: queryObject
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to send query:' + response.status)
      }
      return response
    })
    .catch(error => ({ error }))
}

// TODO: remove this and replace it with real service URL
const FAKE_RESULT_URL =
  'http://secret.ndexbio.org/fake_cytoscapesearch/rest/v1/cytoscapesearch/'
const FAKE_UUID = 'bb50d9cd-b40c-45ab-965c-4b7c7d1bdb5f'

// const getResult = searchId => {
//   // const searchUrl = SEARCH_BASE_URL + searchId
//   const searchUrl = FAKE_RESULT_URL + FAKE_UUID
//
//   console.log('Calling SEARCH API:', searchUrl)
//
//   return fetch(searchUrl, {
//     method: METHOD_GET,
//     mode: 'cors'
//   })
// }

export { getResult, getSource, postQuery, checkStatus }
