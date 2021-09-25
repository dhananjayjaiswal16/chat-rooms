import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice';
import activateSlice from './activateSlice';
import alertSlice from './alertSlice'

export default configureStore({
    reducer: {
        authSlice,
        activateSlice,
        alertSlice
    },
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()