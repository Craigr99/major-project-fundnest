import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const authSlice = createSlice({
  name: "auth",
  initialState: { value: initialStateValue },
  reducers: {
    setAuthToken: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;

export default authSlice.reducer;
