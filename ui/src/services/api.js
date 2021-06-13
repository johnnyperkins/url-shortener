/**
 * Creates a short url
 *
 * @param {string} url
 * @returns {Promise}
 */
export const createShortUrl = async (url = '') => {
  return `http://urlshortener.com/${Math.random()}`
}
