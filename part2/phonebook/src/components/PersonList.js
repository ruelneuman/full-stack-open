import React from 'react';
import Person from './Person'

const PersonList = ({ persons, query }) => {
    const byQuery = query => person =>
        !query || (new RegExp(query.trim(), 'i')).test(person.name);

    return (
        <div>
            <h2>Numbers</h2>
            {persons
                .filter(byQuery(query))
                .map(person =>
                    <Person person={person} />
                )}
        </div>
    )
}

export default PersonList;