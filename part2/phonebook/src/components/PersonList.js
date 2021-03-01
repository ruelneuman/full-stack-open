import React from 'react';
import Person from './Person'

const PersonList = ({ filteredPersons, handleDelete }) => {

    return (
        <div>
            <h2>Numbers</h2>
            {filteredPersons.map(person =>
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