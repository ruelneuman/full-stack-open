import React, { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (persons.some((person) => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = { name: newName, number: newNumber };
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <h2>Search</h2>
            <div>
                search:
                <input
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
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
            <h2>Numbers</h2>
            {persons.filter((person) => (new RegExp(filter.trim(), 'i')).test(person.name))
                .map(person =>
                    <div key={person.name}>
                        {person.name} {person.number}
                    </div>
                )}
        </div>
    );
}

export default App;