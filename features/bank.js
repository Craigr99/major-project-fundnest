import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

export const bankSlice = createSlice({
  name: "bank",
  initialState: { value: initialStateValue },
  reducers: {
    setBankName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBankName } = bankSlice.actions;

export default bankSlice.reducer;
