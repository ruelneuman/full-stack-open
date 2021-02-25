import React from 'react';

const Search = ({ query, handleQuery }) => {
    return (
        <div>
            <label htmlFor="country-search">Find countries:</label>
            <input type="text" value={query} onChange={handleQuery}></input>
        </div>
    );
}

export default Search;