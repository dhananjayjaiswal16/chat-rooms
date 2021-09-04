import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'

export default configureStore({
    reducer: {
        authSlice,
    },
})
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()