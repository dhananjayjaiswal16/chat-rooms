import React from 'react';
import styles from './Button.module.css';

const Button = ({ btnText, onClick }) => {
    return (
        <button className={styles.button} onClick={onClick}>
            <span>{btnText} <i className="fas fa-arrow-right" style={{ marginLeft: '5px' }}></i></span>
        </button>
    )
}

export default Button;
