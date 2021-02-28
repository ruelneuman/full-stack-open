import React from 'react';
import Person from './Person'

const PersonList = ({ persons, query }) => {
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
                    />
                )}
        </div>
    )
}

export default PersonList;