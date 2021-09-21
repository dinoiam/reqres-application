import { createSlice } from '@reduxjs/toolkit';
import { isAuthenticated } from '@src/utils/localStorage';
import { RootState } from '..';
import { login, logout } from '../action/auth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUserAuthenticated: isAuthenticated(),
    isLoggingIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isUserAuthenticated = true;
        state.isLoggingIn = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(logout.toString(), (state) => {
        state.isUserAuthenticated = false;
      });
  }
});

export const getIsUserAuthenticated = (state: RootState): boolean => state.auth.isUserAuthenticated;
export const getIsLoggingIn = (state: RootState): boolean => state.auth.isLoggingIn;

export default authSlice.reducer;
