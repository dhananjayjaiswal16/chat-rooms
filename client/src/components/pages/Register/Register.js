import React, { useState } from 'react';
import styles from './Register.module.css'

import PhoneOrEmail from '../RegisterationSteps/PhoneOrEmail/PhoneOrEmail';
import Otp from '../RegisterationSteps/Otp/Otp';
import Name from '../RegisterationSteps/Name/Name';
import Avatar from '../RegisterationSteps/Avatar/Avatar';
import Username from '../RegisterationSteps/Username/Username';

const steps = {
    1: PhoneOrEmail,
    2: Otp,
    3: Name,
    4: Avatar,
    5: Username,
}

const Register = () => {
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

export default Register
