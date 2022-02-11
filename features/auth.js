import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const authSlice = createSlice({
  name: "auth",
  initialState: { authToken: initialStateValue, nordigenToken: "" },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setNordigenToken: (state, action) => {
      state.nordigenToken = action.payload;
    },
  },
});

export const { setAuthToken, setNordigenToken } = authSlice.actions;

export default authSlice.reducer;
