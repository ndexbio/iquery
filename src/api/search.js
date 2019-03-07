import { METHOD_GET, METHOD_POST } from './apiConstants'

// const SEARCH_BASE_URL =
//   'http://secret.ndexbio.org/fake_cytoscapesearch/rest/v1/cytoscapesearch/'
const SEARCH_BASE_URL = 'http://secret.ndexbio.org:8090/'

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

  const header = new Headers({
    'Content-Type': 'application/json'
  })


  return fetch(searchUrl, {
    method: METHOD_POST,
    headers: header,
    body: JSON.stringify(queryObject)
  })
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to send query:' + response.status)
      }
      return response
    })
    .catch(error => ({ error }))
}

export { getResult, getSource, postQuery, checkStatus }
