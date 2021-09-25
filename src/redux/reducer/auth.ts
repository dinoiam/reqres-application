import { createSlice } from '@reduxjs/toolkit';
import { isAuthenticated } from '@src/utils/localStorage';
import { RootState } from '..';
import { login, logout } from '../action/auth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUserAuthenticated: isAuthenticated()
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isUserAuthenticated = true;
      })
      .addCase(logout.toString(), (state) => {
        state.isUserAuthenticated = false;
      });
  }
});

/**
 * Returns true if the user is authenticated
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getIsUserAuthenticated = (state: RootState): boolean => state.auth.isUserAuthenticated;

export default authSlice.reducer;
