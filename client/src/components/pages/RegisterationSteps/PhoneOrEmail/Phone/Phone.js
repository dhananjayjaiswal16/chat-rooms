import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { sendOtp } from '../../../../../http/httpRoutes'

import Card from '../../../../Skeleton/cardLayout/Card'
import Button from '../../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../../Skeleton/textInputLayout/TextInput'

import { setAlertMsg, removeAlertMsg } from '../../../../../store/alertSlice'


import { useSelector, useDispatch } from 'react-redux'
import Alert from '../../../Alert/Alert'

import styles from '../PhoneOrEmail.module.css'
import { setOtp } from '../../../../../store/authSlice'

const Phone = ({ onClick }) => {
    const [phoneNo, setPhoneNo] = useState();
    const dispatch = useDispatch();
    const id = uuidv4();

    const next = async () => {
        try {
            if (!phoneNo) {

                dispatch(setAlertMsg({ msg: 'Phone No. field is required', id: id }))


                setTimeout(() => (
                    dispatch(removeAlertMsg(id))
                ), 3500);

                return;
            }
            const { data } = await sendOtp({ phone: phoneNo });
            console.log("res.data", data);
            dispatch(setOtp({ phone: data.phone, hash: data.hash }))
            onClick();

        } catch (err) {
            console.log(err.msg);
        }
    }
    return (
        <Card emoji="☎️" title="Enter your phone number">
            <Alert />
            <TextInput value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            <div className={styles.nextButton}>
                <Button onClick={next} btnText="Next"></Button>
            </div>
            <p className="phonePara">
                By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
            </p>
        </Card>
    )
}

export default Phone
