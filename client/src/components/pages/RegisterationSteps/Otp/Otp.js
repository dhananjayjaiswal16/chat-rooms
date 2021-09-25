import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import Card from '../../../Skeleton/cardLayout/Card'
import Button from '../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../Skeleton/textInputLayout/TextInput'
import Alert from '../../Alert/Alert';
import { setAlertMsg, removeAlertMsg } from '../../../../store/alertSlice';

import { verifyOtp } from '../../../../http/httpRoutes';
import { setAuth } from '../../../../store/authSlice'

import { useSelector, useDispatch } from 'react-redux';

import styles from './Otp.module.css'


const Otp = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const id = uuidv4();

    const { phone, hash } = useSelector((state) => state.authSlice.otp);

    const next = async () => {

        if (!otp || !phone || !hash) {
            dispatch(setAlertMsg({ msg: 'OTP is required', id: id }))


            setTimeout(() => (
                dispatch(removeAlertMsg(id))
            ), 3500);
            return;
        }
        const { data } = await verifyOtp({ otp, phone, hash });
        console.log("Data", data);
        dispatch(setAuth(data));
        //onClick();
    }

    return (
        <div className={styles.cardContainer}>
            <Card emoji="🔒" title="Enter the code we just texted you">
                <Alert />
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className={styles.nextButton}>
                    <Button onClick={next} btnText="Next"></Button>
                </div>
                <p>
                    Didn’t receive? Tap to resend
                </p>
            </Card>
        </div>
    )
}

export default Otp