import React from 'react';
import '../index.css';

const Notification = ({ message, isSuccess }) => {
    if (message === null) {
        return null
    }

    const className = `notification ${isSuccess ? 'notification__success' : 'notification__failure'}`

    return (
        <div className={className}>{message}</div>
    );
}

export default Notification;