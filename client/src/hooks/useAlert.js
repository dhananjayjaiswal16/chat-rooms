import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setAlertMsg, removeAlertMsg } from '../store/alertSlice';


export const useAlert = (msg) => {
    const dispatch = useDispatch();
    const id = uuidv4();
    useEffect(() => {
        dispatch(setAlertMsg(msg, id))

        setTimeout(() => (
            dispatch(removeAlertMsg(id))
        ), 3500);
    }, []);
}