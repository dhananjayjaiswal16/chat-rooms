import React from 'react'

import Card from '../../Skeleton/cardLayout/Card'
import Button from '../../Skeleton/buttonLayout/Button'
import { Link, useHistory } from 'react-router-dom'
import styles from './Home.module.css'

const Home = () => {
    //Link styling 
    const signInLink = {
        color: '#0077FF',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '7px'
    }
    const history = useHistory();
    const redirectToRegister = () => {
        history.push('/auth');
    }
    return (
        <div className={styles.cardContainer}>
            <Card emoji="👋 " title="Welcome to Chat house !">
                <p className={styles.paragraph}>We’re working hard to get Chat House ready for everyone! While we wrap up the finishing touches, we’re adding people gradually to make sure nothing breaks </p>
                <Button onClick={redirectToRegister} btnText="Lets Go"></Button>
                <div className={styles.signinContainer}>
                    <span className={styles.inviteLink}>Have an invite link?</span>
                </div>
            </Card>
        </div>

    )
}

export default Home
