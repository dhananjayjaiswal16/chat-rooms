import React from 'react';
import styles from './PhoneOrEmail.module.css';

const PhoneOrEmail = ({ onClick }) => {
    return (
        <div>
            <h1>PhoneOrEmail Component</h1>
            <button onClick={onClick} >Next</button>
        </div>
    )
}

export default PhoneOrEmail;