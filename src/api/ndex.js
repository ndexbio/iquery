import { METHOD_GET, BASE_URL } from './apiConstants'

const fetchNetwork = (id, sourceUUID, networkUUID) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  const fetchUrl =
    BASE_URL +
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

export { fetchNetwork }
