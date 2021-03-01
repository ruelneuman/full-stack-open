import React from 'react';
import Person from './Person'
import personsService from '../services/persons';

const PersonList = ({ persons, query, setPersons, displayNotification }) => {
    const byQuery = (query) => (person) => {
        const modifiedQuery = query.toLowerCase().trim();
        return person.name.toLowerCase().includes(modifiedQuery);
    }

    const handleDelete = (personToDelete) => {
        // exit handleDelete if user selects cancel
        if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

        personsService
            .remove(personToDelete)
            .then(() => {
                setPersons(persons.filter(person => person.id !== personToDelete.id));
                displayNotification(`Removed ${personToDelete.name}`);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.warn(`The person, ${personToDelete.name}, was already deleted from the server.`)
                        setPersons(persons.filter(person => person.id !== personToDelete.id));
                    }
                    console.error(error.response);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
                console.error(error.config);
            });
    }

    return (
        <div>
            <h2>Numbers</h2>
            {persons
                .filter(byQuery(query))
                .map(person =>
                    <Person
                        key={person.id}
                        person={person}
                        handleDelete={handleDelete}
                    />
                )}
        </div>
    )
}

export default PersonList;