import React, { useState } from 'react';
import Otp from '../RegisterationSteps/Otp/Otp';
import PhoneOrEmail from '../RegisterationSteps/PhoneOrEmail/PhoneOrEmail';
import styles from './Login.module.css'

const steps = {
    1: PhoneOrEmail,
    2: Otp,
}

const Login = () => {
    const [step, setStep] = useState(1);
    const CurrentStep = steps[step]; //Get current component

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <>
            <CurrentStep onClick={onClick} />
        </>
    )
}

export default Login;
