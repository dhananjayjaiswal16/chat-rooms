import React, { useState } from 'react'
import Card from '../../../../Skeleton/cardLayout/Card'
import Button from '../../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../../Skeleton/textInputLayout/TextInput'
import styles from '../PhoneOrEmail.module.css'

const Email = ({ onClick }) => {
  const [emailId, setemailId] = useState();
  return (
    <div>
      <Card emoji="✉️" title="Enter your Email Id">
        <TextInput value={emailId} onChange={(e) => setemailId(e.target.value)} />
        <div className={styles.nextButton}>
          <Button onClick={onClick} btnText="Next"></Button>
        </div>
        <p>
          By entering your email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!
                </p>
      </Card>
    </div>
  )
}

export default Email;
