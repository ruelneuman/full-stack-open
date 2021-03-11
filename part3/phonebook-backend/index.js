require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('body', (request, response, next) => {
    return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// does not function yet with db
app.get('/info', (request, response) => {
    response.send(
        `<div>The phonebook has info for ${persons.length} people.</div>
         <div>${new Date()}</div>`
    );
});

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then((persons) => {
            response.json(persons);
        })
        .catch((error) => next(error));
});

// does not function yet with db
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then((result) => {
            if (result === null) {
                response.status(404).end();
            }
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.post('/api/persons/', (request, response, next) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person
        .findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});