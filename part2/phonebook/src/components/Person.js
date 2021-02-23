import React from 'react';

const Person = ({ person }) => {

    return (
        <div key={person.name}>
            {person.name} {person.number}
        </div>
    )
}

export default Person;