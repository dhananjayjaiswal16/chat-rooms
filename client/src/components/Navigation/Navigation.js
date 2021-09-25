import React from 'react';
import { Link } from 'react-router-dom'
import { logout } from '../../http/httpRoutes';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice'

const Navigation = () => {
    const brandStyle = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '22px',
    }

    const { isAuth } = useSelector(state => state.authSlice);
    const dispath = useDispatch();
    const logoutUser = async () => {
        try {
            const data = await logout();
            dispath(setAuth(data));
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to='/'>
                👋 <span style={{ marginLeft: '9px' }} >Chat house</span>
            </Link>
            {isAuth &&
                <button onClick={logoutUser}>Logout</button>}


        </nav>
    )
}

export default Navigation;