require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (request, response, next) => {
    return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122",
    },
];

app.get('/info', (request, response) => {
    response.send(
        `<div>The phonebook has info for ${persons.length} people.</div>
         <div>${new Date()}</div>`
    );
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    })
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

// does not function yet with db
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    if (!persons.some((person) => person.id === id)) {
        return response.status(404).end();
    } else {
        persons = persons.filter((person) => person.id !== id);

        response.status(204).end();
    }
});

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// does not function yet with db
app.post('/api/persons/', (request, response) => {
    const body = request.body;

    if (!body.name) {
        return response.status(400).json({
            error: 'name is required'
        });
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is required'
        });
    }

    if (persons.some((person) => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: randomInt(999999999, 1),
    }

    persons = persons.concat(person);

    response.json(person);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});