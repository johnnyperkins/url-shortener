/**
 * Creates a short url
 *
 * @param {string} url
 * @returns {Promise<String>}
 */
export const createShortUrl = async (url = '') => {
  return `http://urlshortener.com/${Math.random()}`
}

/**
 * Returns the original url from a short url
 *
 * @param {string} shortUrl
 * @returns {Promise<String>}
 */
export const getOriginalUrl = async (shortUrl = '') => {
  return 'http://digitalgrandeur.com'
}
