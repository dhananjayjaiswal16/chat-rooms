import styles from './Loader.module.css'
import Card from '../cardLayout/Card'
import React from 'react'

import spinner from './Spinner-2.gif'

const Loader = ({ msg }) => {
    return (
        <div className={styles.cardContainer}>


            <img src={spinner} alt="Loading..." className={styles.loadingStyle} />
            <span className={styles.msg}>{msg}</span>

        </div>
    )
}

export default Loader;
