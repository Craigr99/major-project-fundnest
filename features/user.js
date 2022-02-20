import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { name: "", email: "", number: "" };

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue, accountID: "" },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    getUserAccount: (state, action) => {
      state.accountID = action.payload;
    },
  },
});

export const { setUser, getUserAccount } = userSlice.actions;

export default userSlice.reducer;
