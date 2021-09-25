import React, { useState } from 'react'
import styles from './Name.module.css'
import { v4 as uuidv4 } from 'uuid';

import Card from '../../../Skeleton/cardLayout/Card'
import Button from '../../../Skeleton/buttonLayout/Button'
import TextInput from '../../../Skeleton/textInputLayout/TextInput'

import { useDispatch, useSelector } from 'react-redux'
import { setName } from '../../../../store/activateSlice'
import Alert from '../../Alert/Alert'
import { setAlertMsg, removeAlertMsg } from '../../../../store/alertSlice';

const Name = ({ onClick }) => {
    const { name } = useSelector((state) => state.activateSlice)
    const [fullname, setFullname] = useState(name);
    const dispatch = useDispatch();
    const id = uuidv4();

    const next = () => {
        if (!fullname) {

            dispatch(setAlertMsg({ msg: 'Name field is required', id: id }))


            setTimeout(() => (
                dispatch(removeAlertMsg(id))
            ), 3500);


            return;
        }
        dispatch(setName(fullname));
        onClick();
    }
    return (
        <div className={styles.cardContainer}>
            <Card emoji="📛" title="Give in your full name">
                <Alert />
                <TextInput value={fullname} onChange={(e) => setFullname(e.target.value)} />

                <p>
                    People use real names at
                    Chat House :)
                </p>

                <div class={styles.nextButton}>
                    <Button onClick={next} btnText="Next"></Button>
                </div>

            </Card>
        </div>
    )
}

export default Name;