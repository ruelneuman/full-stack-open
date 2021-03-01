import React from 'react';
import Person from './Person'
import personsService from '../services/persons';

const PersonList = ({ persons, query, handleDelete }) => {
    const byQuery = (query) => (person) => {
        const modifiedQuery = query.toLowerCase().trim();
        return person.name.toLowerCase().includes(modifiedQuery);
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