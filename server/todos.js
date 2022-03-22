const express = require('express')
const { jsonPlaceholderTodos } = require('./http')

const router = express.Router()

// if I were setting up a simple passthrough proxy like this in a real project
// I'd probably use something like this to save time/redundancy:
// https://www.npmjs.com/package/http-proxy-middleware

router
  .get('/', async (_, res) => {
    try {
      const { data } = await jsonPlaceholderTodos.get('/?userId=1')
      res.send(data)
    } catch (e) {
      res.send({ error: 'Something went wrong' })
    }
  })
  .get('/:todoId', async (req, res) => {
    try {
      const { data } = await jsonPlaceholderTodos.get(req.params.todoId)
      res.send(data)
    } catch (e) {
      res.status(404).send(e)
    }
  })
  .post('/', async (req, res) => {
    try {
      const { data } = await jsonPlaceholderTodos.post(
        '/',
        { ...req.body },
        {
          'Content-type': 'application/json; charset=UTF-8'
        }
      )
      res.send(data)
    } catch (e) {
      res.send(e)
    }
  })
  .patch('/:todoId', async (req, res) => {
    console.log(req.params.todoId)
    try {
      const { data } = await jsonPlaceholderTodos.patch(
        req.params.todoId,
        { ...req.body },
        {
          'Content-type': 'application/json; charset=UTF-8'
        }
      )
      res.send(data)
    } catch (e) {
      res.send(e)
    }
  })
  .delete('/:todoId', async (req, res) => {
    try {
      const { data } = await jsonPlaceholderTodos.delete(req.params.todoId)
      console.log(data)
      res.send(data)
    } catch (e) {
      res.send(e)
    }
  })

module.exports = router
