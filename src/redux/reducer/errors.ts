import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import { RootState } from '..';
import { login } from '../action/auth';
import { fetchUsers, createUser, updateUser } from '../action/user';

const genericError = 'There was an error, please try later';

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    [login.typePrefix]: false,
    [fetchUsers.typePrefix]: false,
    [createUser.typePrefix]: false,
    [updateUser.typePrefix]: false,
    lastErrorMessage: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (isPending(login)(action)) state[login.typePrefix] = false;
        if (isPending(fetchUsers)(action)) state[fetchUsers.typePrefix] = false;
        if (isPending(createUser)(action)) state[createUser.typePrefix] = false;
        if (isPending(updateUser)(action)) state[updateUser.typePrefix] = false;
      })
      .addMatcher(isRejected, (state, action) => {
        state.lastErrorMessage =
          (action.payload as { errorMessage: string })?.errorMessage ?? genericError;
        if (isRejected(login)(action)) state[login.typePrefix] = true;
        if (isRejected(fetchUsers)(action)) state[fetchUsers.typePrefix] = true;
        if (isRejected(createUser)(action)) state[createUser.typePrefix] = true;
        if (isRejected(updateUser)(action)) state[updateUser.typePrefix] = true;
      });
  }
});

export const getLastErrorMessage = (state: RootState): string => state.errors.lastErrorMessage;

export default errorsSlice.reducer;
