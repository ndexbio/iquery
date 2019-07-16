import { METHOD_GET, METHOD_POST, BASE_URL } from './apiConstants'

/**
 * Check the status of the services.
 *
 * @returns {Promise<Response | never | {error: any}>}
 */
const getSource = () => {
  const searchUrl = BASE_URL + 'source'
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
  const checkJobStatusUrl = BASE_URL + jobId + '/status'

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

const getResult = (jobId, sourceName = null) => {
  const url = BASE_URL + jobId

  const resultUrl = new URL(url)

  if (sourceName !== null) {
    resultUrl.searchParams.append('source', sourceName)
  }

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
  const searchUrl = BASE_URL

  const queryObject = {
    geneList,
    sourceList
  }

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
