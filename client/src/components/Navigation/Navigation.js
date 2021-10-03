import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { logout } from '../../http/httpRoutes';
import styles from './Navigation.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../store/authSlice'
import Loader from '../Skeleton/Loader/Loader'

const Navigation = () => {
    const brandStyle = {
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '22px',
    }

    const { isAuth, user } = useSelector(state => state.authSlice);
    const dispath = useDispatch();
    //const [loading, setLoading] = useState(false);
    const logoutUser = async () => {
        //setLoading(true);
        try {
            const data = await logout();
            dispath(setAuth(data));
            //setLoading(false);
        } catch (err) {
            console.error(err);
            //setLoading(false);
        }
    }

    // if (loading) {
    //     return <Loader msg='Logging Out...' />
    // }
    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to='/'>
                👋 <span style={{ marginLeft: '9px' }} >Chat house</span>
            </Link>
            {isAuth && <div className={styles.right}>
                <h3>{user && user.name}</h3>
                {user.avatar && <Link to='/'>
                    <img className={styles.userAvatar} src={user.avatar} width='40' height='40' alt={`${user && user.name}-img`} />
                </Link>}
                <button className={styles.logoutBtn} onClick={logoutUser}><i className={`fas fa-sign-out-alt ${styles.logoutIcon}`}></i></button>
            </div>}


        </nav>
    )
}

export default Navigation;