const express = require('express')

const PORT = process.env.PORT || 3001
const todoRoutes = require('./todos')

const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/api', (_, res) => {
  res.json({ message: 'Hello from server!' })
})

app.use('/todos', todoRoutes)

app.use((_, res) => {
  res.status(404)
  res.send({ error: 'Sorry, this route is not defined' })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
