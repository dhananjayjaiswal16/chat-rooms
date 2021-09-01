import React, { useState } from 'react'
import Card from '../../../../Skeleton/cardLayout/Card'
import Button from '../../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../../Skeleton/textInputLayout/TextInput'
import styles from '../PhoneOrEmail.module.css'
const Phone = ({ onClick }) => {
    const [phoneNo, setPhoneNo] = useState();

    return (
        <Card emoji="☎️" title="Enter you phone number">
            <TextInput value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
            <div className={styles.nextButton}>
                <Button onClick={onClick} btnText="Next"></Button>
            </div>
            <p>
                By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
            </p>
        </Card>
    )
}

export default Phone
