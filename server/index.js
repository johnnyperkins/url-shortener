const express = require('express')
const cors = require('cors')
const redis = require('redis')
const app = express()
const port = 3000
const redisClient = redis.createClient()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

redisClient.on('error', function(error) {
  console.error(error)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
