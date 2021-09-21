import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { login } from '../action/auth';

export const errorsSlice = createSlice({
  name: 'erros',
  initialState: {
    errorMessage: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, { payload }) => {
        state.errorMessage = '';
      })
      .addCase(login.rejected, (state, { payload }) => {
        if (payload) {
          state.errorMessage = payload.errorMessage;
        }
      });
  }
});

export const getErrorMessage = (state: RootState): string => state.errors.errorMessage;

export default errorsSlice.reducer;
