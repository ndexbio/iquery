const VISITED_KEY = '__visited'
const DAYS = 180
const EXPIRATION = 60 * 60 * 24 * DAYS

const getCookie = id => {
  const cookieMap = getCookieMap()
  return cookieMap.get(id)
}

const getCookieMap = () => {
  const cookies = document.cookie
  if (cookies === null || cookies === '' || cookies === undefined) {
    return new Map()
  }

  return new Map(
    cookies.split(/;\s*/).map(kv => {
      const entry = kv.match(/([^=]+)=(.*)/)
      const key = entry[1]
      const value = entry[2]
      return [key, value.replace(/(^"|"$)/g, '')]
    }),
  )
}

const checkFirstTimeVisitor = () => {
  const visited = getCookie(VISITED_KEY)
  if (visited === null || visited === undefined) {
    document.cookie = `${VISITED_KEY}=true;max-age=${EXPIRATION}`
    return true
  }

  return false
}


const TOUR_DISABLED_KEY = '__tourDisabled'

const setTourDisabled = (disableTour) => {
  localStorage.setItem(TOUR_DISABLED_KEY, disableTour);
};

const getTourDisabled = () => {
  return localStorage.getItem(TOUR_DISABLED_KEY) || false;
}


export { checkFirstTimeVisitor, setTourDisabled, getTourDisabled }
