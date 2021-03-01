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
    const [isSuccess, setIsSuccess] = useState(true);

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
    }, []);

    const displayNotification = (message, isSuccess) => {
        setMessage(message);
        setIsSuccess(isSuccess)
        setTimeout(() => {
            setMessage(null);
        }, 3000);
    }

    const handleQuery = (event) => {
        setQuery(event.target.value);
    }

    const handleDelete = (personToDelete) => {
        // exit handleDelete if user selects cancel
        if (!window.confirm(`Delete ${personToDelete.name}?`)) return;

        personsService
            .remove(personToDelete)
            .then(() => {
                setPersons(persons.filter(person => person.id !== personToDelete.id));
                displayNotification(`Removed ${personToDelete.name}`, true);
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        setPersons(persons.filter(person => person.id !== personToDelete.id));
                        console.warn(`${personToDelete.name} was already removed from the server`)
                        displayNotification(`${personToDelete.name} was already removed from the server`, false);
                    }
                    console.error(error.response);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
                console.error(error.config);
            });
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification
                message={message}
                isSuccess={isSuccess}
            />
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
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;