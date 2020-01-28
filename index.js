const express = require('express')

const server = express()

/**
 * Middlewares as displayed in bootcamp
 */

server.use(express.json())

server.use((req, res, next) => {
  console.time('Request')
  console.log(`Método: ${req.method}; URL: ${req.url}`)
  next()
  console.timeEnd('Request')
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: `User name is required` })
  }
  return next()
}

function checkUserInArray(req, res, next) {
  const { index } = req.params
  const user = users[index]
  if (!user) {
    return res.status(400).json({ error: `User does not exists` })
  }
  req.user = user
  return next()
}

// CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Robert']

server.get('/users/', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user)
})

server.post('/users/', checkUserExists, (req, res) => {
  const { name } = req.body

  users.push(name)

  return res.json(users)
})

server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params

  users.splice(index, 1)

  return res.json(users)
})

server.listen(3000)
