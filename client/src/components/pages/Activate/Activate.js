import React, { useState } from 'react'

import Name from '../RegisterationSteps/Name/Name'
import Avatar from '../RegisterationSteps/Avatar/Avatar'

const steps = {
    1: Name,
    2: Avatar
}

const Activate = () => {
    const [step, setStep] = useState(1);
    const CurrentStep = steps[step];

    const onClick = () => {
        setStep(step + 1);
    }

    return (
        <>
            <CurrentStep onClick={onClick} />
        </>
    )
}

export default Activate
