import React from 'react';
import '../index.css';

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const className = `notification notification__${notification.type}`

    return (
        <div className={className}>{notification.message}</div>
    );
}

export default Notification;