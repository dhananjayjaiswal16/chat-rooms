import React from 'react';
import styles from './Username.module.css';

const Username = ({ onClick }) => {
    return (
        <div>
            <h1>Username Component</h1>
            <button onClick={onClick}>Next</button>
        </div>
    )
}

export default Username;