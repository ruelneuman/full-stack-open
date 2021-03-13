import React, { useState } from 'react';
import personsService from '../services/persons';

const Form = ({ persons, setPersons, displayNotification }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    // update existing person that has corresponding id with data from newPerson
    const updateExistingPerson = (id, newPerson) => {
        const message = `${newPerson.name} is already added to the phonebook.\nOverwrite the old number with a new one?`;

        // exit handleSubmit if user doesn't want to overwrite number
        if (!window.confirm(message)) return;

        personsService
            .update(id, newPerson)
            .then((returnedPerson) => {
                setPersons(persons.map((person) => person.id !== id ? person : returnedPerson));
                setNewName('');
                setNewNumber('');
                displayNotification(`Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    console.error(error.response);
                    displayNotification(error.response.data.error, 'failure');
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
                console.error(error.config);
            });
    }

    const addPerson = (newPerson) => {
        personsService
            .create(newPerson)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewNumber('');
                displayNotification(`Added ${returnedPerson.name}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    console.error(error.response);
                    displayNotification(error.response.data.error, 'failure');
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
                console.error(error.config);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPerson = { name: newName, number: newNumber };

        if (persons.some((person) => person.name === newName)) {
            const personToUpdate = persons.find((person) => person.name === newPerson.name);
            const id = personToUpdate.id;
            updateExistingPerson(id, newPerson);
        } else {
            addPerson(newPerson);
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h2>Add Person</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handleNameChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}

export default Form;