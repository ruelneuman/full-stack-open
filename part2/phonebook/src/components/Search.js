import React from 'react';

const Search = ({ query, handleQuery }) => {
    return (
        <div>
            <h2>Search</h2>
            search:
            <input
                value={query}
                onChange={handleQuery}
            />
        </div>
    );
}

export default Search;