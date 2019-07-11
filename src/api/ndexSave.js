import { METHOD_GET, BASE_URL } from './apiConstants'

const NDEX_USER_VALIDATION = 'http://ndexbio.org/v2/user?valid=true'

const ndexValidation = headers => {
  console.log('Calling NDEx validation with headers: ', headers)

  return fetch(NDEX_USER_VALIDATION, {
    method: METHOD_GET,
    headers: headers
  })
}

export { ndexValidation }
