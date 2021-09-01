import React, { useState } from 'react'
import Card from '../../../Skeleton/cardLayout/Card'
import Button from '../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../Skeleton/textInputLayout/TextInput'

import styles from './Otp.module.css'


const Otp = ({ onClick }) => {
    const [otp, setOtp] = useState('');

    return (
        <div className={styles.cardContainer}>
            <Card emoji="🔒" title="Enter the code we just texted you">
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div className={styles.nextButton}>
                    <Button btnText="Next"></Button>
                </div>
                <p>
                    Didn’t receive? Tap to resend
                </p>
            </Card>
        </div>
    )
}

export default Otp