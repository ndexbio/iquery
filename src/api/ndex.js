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

  // const url2 = 'http://public.ndexbio.org/v2/network/b9989f1c-816f-11e8-a4bf-0ac135e8bacf'

  // console.log('#############Calling CX API:', url2)

  return fetch(fetchUrl, {
    method: METHOD_GET,
    headers
  })
}

export { fetchNetwork }
