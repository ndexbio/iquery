export const AUTH_TYPE = {
  KEYCLOAK: 'keycloak',
  BASIC: 'basic',
  NONE: 'none',
}

export const LOGGED_IN_USER_LOCAL_STORAGE_KEY = 'loggedInUser'

export const getBasicAuthInfo = (basicAuthLocalStorageKey = LOGGED_IN_USER_LOCAL_STORAGE_KEY) => {
  const basicAuthInfo = window.localStorage.getItem(basicAuthLocalStorageKey)

  if (basicAuthInfo == null) {
    return null
  }
  const parsedBasicAuthInfo = JSON.parse(basicAuthInfo)

  return parsedBasicAuthInfo
}
export const basicAuthInfoExists = (basicAuthLocalStorageKey = LOGGED_IN_USER_LOCAL_STORAGE_KEY) => {
  return getBasicAuthInfo(basicAuthLocalStorageKey) != null
}

export const keycloakUserInfoExists = (keycloak) => {
  return keycloak != null && keycloak.authenticated
}

export const userIsLoggedIn = (keycloak, basicAuthLocalStorageKey = LOGGED_IN_USER_LOCAL_STORAGE_KEY) => {
  return basicAuthInfoExists(basicAuthLocalStorageKey) || keycloakUserInfoExists(keycloak)
}

export const LOGGED_OUT_USER_PROFILE = {
  name: '',
  image: '',
  type: AUTH_TYPE.NONE,
}

export const getUserProfileInformation = (keycloak, basicAuthLocalStorageKey = LOGGED_IN_USER_LOCAL_STORAGE_KEY) => {
  if (keycloakUserInfoExists(keycloak)) {
    return {
      name: keycloak.tokenParsed.name,
      image: '',
      type: AUTH_TYPE.KEYCLOAK,
    }
  }

  if (basicAuthInfoExists(basicAuthLocalStorageKey)) {
    const basicAuthInfo = getBasicAuthInfo(basicAuthLocalStorageKey)
    return {
      userName: basicAuthInfo.userName,
      name: basicAuthInfo.firstName,
      token: basicAuthInfo.token,
      image: basicAuthInfo.image,
      type: AUTH_TYPE.BASIC,
    }
  }

  return LOGGED_OUT_USER_PROFILE
}

export const getBasicAuthHeader = (userName, password) => {
  return `Basic ${window.btoa(`${userName}:${password}`)}`
}

export const getKeycloakAuthHeader = (token) => {
  return `Bearer ${token}`
}

export const getToken = (keycloak, userProfile) => {
  if (userProfile.type === AUTH_TYPE.KEYCLOAK) {
    return keycloak.updateToken(5).then(() => {
      return getKeycloakAuthHeader(keycloak.token)
    })
  } else {
    if (userProfile.type === AUTH_TYPE.BASIC) {
      return Promise.resolve(getBasicAuthHeader(userProfile.userName, userProfile.token))
    }
  }
  return Promise.resolve(null)
}

export const isAuthenticated = (userProfile) => {
  return userProfile == null || userProfile?.type !== AUTH_TYPE.NONE
}

export const logoutUserProfile = (userProfile) => {
  return {
    name: '',
    image: '',
    type: AUTH_TYPE.NONE,
  }
}
