import React from 'react'
import styles from './Card.module.css'

const Card = ({ emoji, title, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.headingContainer}>
                <h1 className={styles.heading}>{emoji} <span>{title}</span></h1>
            </div>
            {children}
        </div>
    )
}

export default Card;
