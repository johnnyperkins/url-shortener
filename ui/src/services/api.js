const rootDomain = 'http://localhost:3000'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

/**
 * Creates a short url
 *
 * @param {string} url
 * @returns {Promise<String>}
 */
export const createShortUrl = async (url = '') => {
  const response = await fetch(`${rootDomain}/urls`, {
    method: 'post',
    body: JSON.stringify({ url }),
    headers
  })

  if (response.ok) {
    const responseJson = await response.json()
    return responseJson
  } else {
    const errorText = await response.text()
    throw new Error(errorText)
  }
}

/**
 * Returns the original url from a short url
 *
 * @param {string} shortUrl
 * @returns {Promise<String>}
 */
export const getOriginalUrl = async (shortUrl = '') => {
  const response = await fetch(`${rootDomain}/urls/${shortUrl}`, {
    method: 'get',
    headers
  })

  if (response.ok) {
    const responseText = await response.text()
    return responseText
  } else {
    const errorText = await response.text()
    throw new Error(errorText)
  }
}
