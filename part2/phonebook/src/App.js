import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Search from './components/Search';
import Notification from './components/Notification';
import PersonList from './components/PersonList';
import personsService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
    }, []);

    const displayNotification = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification message={message} />
            <Search
                query={query}
                handleQuery={handleQuery}
            />
            <Form
                persons={persons}
                setPersons={setPersons}
                displayNotification={displayNotification}
            />
            <PersonList
                persons={persons}
                query={query}
                setPersons={setPersons}
                displayNotification={displayNotification}
            />
        </div>
    );
}

export default App;