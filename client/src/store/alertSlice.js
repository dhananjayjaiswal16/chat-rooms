import { createSlice } from '@reduxjs/toolkit';

export const alertSlice = createSlice({
  name: 'alert',

  initialState: {
    alerts: []
  },

  reducers: {
    setAlertMsg: (state, action) => {
      // console.log("action.payload in set", action.payload);
      state.alerts.push(action.payload);
    },
    removeAlertMsg: (state, action) => {
      // console.log("action.payload in remove", action.payload);
      state.alerts = state.alerts.filter(alert =>
        alert.id !== action.payload
      );
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAlertMsg, removeAlertMsg } = alertSlice.actions

export default alertSlice.reducer;