const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person')


app.use(bodyParser.json())
app.use(cors())

morgan.token('body', function getBody (req) {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Jarvinen',
    number: '040-4323234'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'

  }
]





app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
      res.json(people.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
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

app.post('/api/persons', (req,res) => {
  const body = req.body

  if(body.name === undefined || body.number === undefined){
    return res.status(400).json({error: 'Name or number is missing'})
  } 
  if(persons.findIndex(p => p.name === body.name) !== -1){
      return res.status(400).json({ error: 'Name is already in the directory'})
  } 

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
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT 


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
