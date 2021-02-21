import React from 'react';

const Total = ({ course: { parts } }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p><strong>total of {total} exercises</strong></p>
    );
}

export default Total;