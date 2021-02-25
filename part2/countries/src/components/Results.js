import React from 'react';
import Country from './Country';

const Results = ({ countries, query, setQuery }) => {
    const byQuery = query => country =>
        !query || (new RegExp(query.trim(), 'i')).test(country.name);

    const filteredCountries = countries.filter(byQuery(query));

    if (filteredCountries.length <= 0) {
        return <div>No matches. Try another filter.</div>;
    }

    if (filteredCountries.length === 1) {
        return <Country country={filteredCountries[0]} />;
    }

    if (filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map(country => {
                    return (
                        <div key={country.alpha3Code}>
                            {country.name}
                            <button type="button" onClick={() => setQuery(country.name)}>show</button>
                        </div>
                    )
                })}
            </div>
        );
    }

    // filteredCountries.length > 10 
    return <div>Too many matches. Try another filter.</div>;
}

export default Results;