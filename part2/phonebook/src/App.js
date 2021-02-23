import React, { useState } from 'react';
import Form from './components/Form';
import Search from './components/Search';
import PersonList from './components/PersonList';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');

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