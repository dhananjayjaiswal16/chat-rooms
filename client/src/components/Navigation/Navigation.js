import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

const Navigation = () => {
    const brandStyle = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '22px',
    }
    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to='/'>
                👋 <span style={{ marginLeft: '9px' }} >Chat house</span>
            </Link>
        </nav>
    )
}

export default Navigation;