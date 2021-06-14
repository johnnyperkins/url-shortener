const express = require('express')
const cors = require('cors')
const redis = require('redis')
const { nanoid } = require('nanoid')

const app = express()
// TODO use env vars
const port = 3000
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

/**
 * Generates a random string 11 chars long
 *
 * If 1000 IDs are generated per hour then
 * ~139 years are needed, in order to have a 1% probability of at least one collision.
 *
 * @returns {string}
 */
const generateShortUrl = () => nanoid(11)

redisClient.on('error', function(error) {
  // TODO log error
  console.error(error)
})

/**
 * Creates a short url and saves to db
 *
 * Two entries are created:
 * key: shortUrl, value: longUrl
 * key: longUrl, value: shortUrl
 */
app.post('/urls', async (req, res) => {
  const longUrl = req.body.url

  redisClient.get(`i-${longUrl}`, function(err, savedShortUrl) {
    if (err) {
      // TODO log error
      res.status(500).send({
        message: 'Server error',
        error: err
     })
    } else if (savedShortUrl === null) {
      // no short url created yet
      const shortUrl = generateShortUrl()
      redisClient.set(shortUrl, longUrl)
      redisClient.set(`i-${longUrl}`, shortUrl)
      res.send({ shortUrl, longUrl })
    } else {
      // short url already created
      res.send({ shortUrl: savedShortUrl, longUrl })
    }
  })
})

/**
 * Returns the original url for a given shortened url
 */
app.get('/urls/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl

  redisClient.get(shortUrl, function(err, val) {
    if (err) {
      // TODO log error
      res.status(500).send({
        message: 'Server error',
        error: err
     })
    } else if (val === null) {
      res.status(404).send('Link does not exist')
    } else {
      res.send(val)
    }
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
