import React, { useState } from 'react'

import { sendOtp } from '../../../../../http/httpRoutes'

import Card from '../../../../Skeleton/cardLayout/Card'
import Button from '../../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../../Skeleton/textInputLayout/TextInput'

import { useSelector, useDispatch } from 'react-redux'

import styles from '../PhoneOrEmail.module.css'
import { setOtp } from '../../../../../store/authSlice'

const Phone = ({ onClick }) => {
    const [phoneNo, setPhoneNo] = useState();
    const dispatch = useDispatch()

    const next = async () => {
        try {
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
