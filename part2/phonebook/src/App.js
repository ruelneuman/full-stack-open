import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Search from './components/Search';
import Notification from './components/Notification';
import PersonList from './components/PersonList';
import personsService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [query, setQuery] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        personsService
            .getAll()
            .then((initialPersons) => {
                setPersons(initialPersons);
            })
    }, []);

    const displayNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
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
                displayNotification(`Removed ${personToDelete.name}`, 'success');
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        setPersons(persons.filter(person => person.id !== personToDelete.id));
                        console.warn(`${personToDelete.name} was already removed from the server`);
                        displayNotification(`${personToDelete.name} was already removed from the server`, 'failure');
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

    const byQuery = (query) => (person) => {
        const modifiedQuery = query.toLowerCase().trim();
        return person.name.toLowerCase().includes(modifiedQuery);
    }

    const filteredPersons = persons.filter(byQuery(query));

    return (
        <div>
            <h1>Phonebook</h1>
            <Notification notification={notification} />
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
                filteredPersons={filteredPersons}
                handleDelete={handleDelete}
            />
        </div>
    );
}

export default App;