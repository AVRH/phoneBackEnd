const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')


app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      res.json(person.toJSON())
    })
})

app.get('/info', (req,res) => {
  const date = new Date()
  const dateString = `<p>${date}</p>`
  const titleString = `<p>Puhelinluettelossa on ${persons.length} numeroa </p>`

  res.send(titleString+dateString)

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
  const body = req.body

  const person = new Person(
    {
    name: body.name,
    number: body.number}
    )
  person
      .save()
      .then(savedPerson => {
        res.json(savedPerson.toJSON())
      })
      .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person
    .findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))

})

const unknownEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if(error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(404).send({error: 'malformatted id'})
  }
  else if(error.name === 'ValidationError'){
    return res.status(404).send({error: error.message}) 
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
