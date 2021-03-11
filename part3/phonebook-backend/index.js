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

app.get('/info', (request, response) => {
    response.send(
        `<div>The phonebook has info for ${persons.length} people.</div>
         <div>${new Date()}</div>`
    );
});

app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then((persons) => {
            response.json(persons);
        });
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
        .catch((error) => console.log(error));
});

app.post('/api/persons/', (request, response) => {
    const body = request.body;

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});