import {AccountState } from "./types"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AccountState = {
  user: null,
  loading: false,
  error: null,
  token: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
    },
    loginFailure: (state, action: PayloadAction<{ error: string }>) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = accountSlice.actions;
export default accountSlice.reducer;
