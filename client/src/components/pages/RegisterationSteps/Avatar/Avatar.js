import React, { useState } from 'react'
import styles from './Avatar.module.css'

import Card from '../../../Skeleton/cardLayout/Card'
import Button from '../../../Skeleton/buttonLayout/Button'

import { activate } from '../../../../http/httpRoutes'
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../../store/activateSlice';
import { setAuth } from '../../../../store/authSlice'

import Loader from '../../../Skeleton/Loader/Loader'

const Avatar = ({ onClick }) => {
    const { name, avatar } = useSelector(state => state.activateSlice);
    const [image, setImage] = useState('/react-logo.png');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const setSelectedImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);//this step takes some time to execute
        reader.onloadend = () => {
            setImage(reader.result);
            dispatch(setAvatar(reader.result))
        }
    }
    const submit = async () => {
        if (!name || !avatar) return;
        setLoading(true);
        try {
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                dispatch(setAuth(data));
            }
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    if (loading) {
        return <Loader msg='Authentication in progress' />
    }
    return (
        <div className={styles.cardContainer}>
            <Card emoji="😎" title={`Hey, ${name}`}>

                <p className={styles.subheading}>
                    Show the world how you look like
                </p>
                <div className={styles.avatarContainer} >
                    <img className={styles.avatarImg} src={image} alt="avatar" />
                </div>
                <div>
                    <input className={styles.avatarInput} type="file" id="avatarInput"
                        onChange={setSelectedImage}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">Choose your photograph</label>
                </div>
                <div class={styles.nextButton}>
                    <Button onClick={submit} btnText="Next"></Button>
                </div>

            </Card>
        </div>
    )
}

export default Avatar;
