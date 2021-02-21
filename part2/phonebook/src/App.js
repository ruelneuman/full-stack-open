import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const person = { name: newName };
        setPersons(persons.concat(person));
        setNewName('');
    }

    const handleChange = (event) => {
        setNewName(event.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <p key={person.name}>
                    {person.name}
                </p>
            )}
        </div>
    );
}

export default App;