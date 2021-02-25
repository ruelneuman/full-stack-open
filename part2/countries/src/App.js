import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';

import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      });
  }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  }

  return (
    <div>
      <Search
        query={query}
        handleQuery={handleQuery}
      />
      <Results
        countries={countries}
        query={query}
      />
    </div>
  );
}

export default App;
