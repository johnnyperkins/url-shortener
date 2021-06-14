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
  console.error(error)
})

app.post('/urls', (req, res) => {
  const longUrl = req.body.url
  const shortUrl = generateShortUrl()

  redisClient.set(shortUrl, url)

  res.send({ shortUrl, longUrl })
})

app.get('/urls/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl

  redisClient.get(shortUrl, function(err, val) {
    if (err) {
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
