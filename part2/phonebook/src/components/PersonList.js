import React from 'react';
import Person from './Person'
import personsService from '../services/persons';

const PersonList = ({ persons, setPersons, query }) => {
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
            })
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