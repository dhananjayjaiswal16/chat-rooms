import React from 'react'
import styles from './Otp.module.css'

const Otp = ({ onClick }) => {
    return (
        <div>
            <h1>Otp Component</h1>
            <button onClick={onClick}>Next</button>
        </div>
    )
}

export default Otp