import { loginAsync, logoutAsync } from "./actions";
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
  reducers: {},
  extraReducers:(builder)=> {
    builder
      .addCase(loginAsync.pending,(state)=>{
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled,(state,action:PayloadAction<any>)=>{
        state.loading = false;
        state.token = action.payload.token;
        state.error = action.payload.message;
      })
      .addCase(loginAsync.rejected,(state,action:PayloadAction<any>)=>{
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(logoutAsync.pending,(state)=>{
        state.loading = true;
      })
      .addCase(logoutAsync.fulfilled,(state)=>{
        state.loading = false;
        state.token = null;
      })
      .addCase(logoutAsync.rejected,(state)=>{
        state.loading = false;
      })
  },
});

export default accountSlice.reducer;
