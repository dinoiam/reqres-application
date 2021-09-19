import { createSlice } from '@reduxjs/toolkit';
import { isAuthenticated } from '@src/utils/localStorage';
import { RootState } from '..';
import { login } from '../action/auth';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isUserAuthenticated: isAuthenticated(),
    isLoggingIn: false,
    errorMessage: ''
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
      .addCase(login.rejected, (state, { payload }) => {
        if (payload) {
          state.errorMessage = payload?.errorMessage;
        }
        state.isLoggingIn = false;
      });
    // .addCase(login.rejected, (state, { payload }) => {
    //   if (payload) {
    //     console.log(payload);
    //     // state.error = payload
    //   }
    // });
  }
  // reducers: {
  // increment: (state) => {
  //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
  //   // doesn't actually mutate the state because it uses the Immer library,
  //   // which detects changes to a "draft state" and produces a brand new
  //   // immutable state based off those changes
  //   state.value += 1
  // },
  // decrement: (state) => {
  //   state.value -= 1
  // },
  // incrementByAmount: (state, action) => {
  //   state.value += action.payload
  // },
  // }
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions

export const getIsUserAuthenticated = (state: RootState): boolean => state.auth.isUserAuthenticated;
export const getIsLoggingIn = (state: RootState): boolean => state.auth.isLoggingIn;

export default authSlice.reducer;
