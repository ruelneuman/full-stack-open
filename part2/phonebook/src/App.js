import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Search from './components/Search';
import PersonList from './components/PersonList';
import personsService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
    }, []);

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Search
                query={query}
                handleQuery={handleQuery}
            />
            <Form
                persons={persons}
                setPersons={setPersons}
            />
            <PersonList
                persons={persons}
                query={query}
            />
        </div>
    );
}

export default App;