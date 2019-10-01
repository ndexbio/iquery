import { METHOD_GET, METHOD_POST } from './apiConstants'

const NDEX_USER_VALIDATION = 'http://ndexbio.org/v2/user?valid=true'
const NDEX_SAVE = 'http://ndexbio.org/v2/network'

const ndexValidation = headers => {
  //console.log('Calling NDEx validation with headers: ', headers)

  return fetch(NDEX_USER_VALIDATION, {
    method: METHOD_GET,
    headers: headers
  })
}

const saveToNDEx = (cx, headers) => {
  //console.log('Calling Save-to-NDEx')

  return fetch(NDEX_SAVE, {
    method: METHOD_POST,
    headers: headers,
    body: JSON.stringify(cx)
  })
}

export { ndexValidation, saveToNDEx }
