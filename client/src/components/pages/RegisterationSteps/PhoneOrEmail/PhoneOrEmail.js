import React, { useState } from 'react';

import Phone from './Phone/Phone'
import Email from './Email/Email'

import styles from './PhoneOrEmail.module.css';


const loginMode = {
    phone: Phone,
    email: Email
}
const PhoneOrEmail = ({ onClick }) => {
    const [mode, setMode] = useState('phone');
    const CurrentMode = loginMode[mode]; //Get current component

    return (
        <>
            <div className={styles.cardContainer}>
                <div>
                    <div className={styles.buttonContainer}>
                        <button className={`${styles.iconButton} ${mode === 'phone' ? styles.current : ''}`} onClick={() => setMode('phone')}>
                            <i className="fas fa-mobile-alt"></i>
                        </button>
                        <button className={`${styles.iconButton} ${mode === 'email' ? styles.current : ''}`} onClick={() => setMode('email')}>
                            <i className="far fa-envelope"></i>
                        </button>
                    </div>
                    <CurrentMode onClick={onClick} />
                </div>

            </div>


        </>
    )
}

export default PhoneOrEmail;