import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Results from './components/Results';

import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState();
  const [gettingCountries, setGettingCountries] = useState(true);
  const [isError, setIsError] = useState(false);

  const updateCountries = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        setGettingCountries(false);
      })
      .catch(function (error) {
        if (error.response) {
          console.error(error.response.data);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error('Error', error.message);
        }
        setIsError(true);
      });
  }

  useEffect(updateCountries, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
  }

  return (
    <div>
      <Search
        query={query}
        handleQuery={handleQuery}
      />
      {gettingCountries && !isError && <div>Getting countries data...</div>}
      {isError && <div>Error: Could not get countries data</div>}
      {!gettingCountries && <Results
        countries={countries}
        query={query}
        setQuery={setQuery}
      />}
    </div>
  );
}

export default App;
