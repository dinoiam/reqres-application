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

/**
 * Returns the last error message saved inside the store
 *
 * @param state - The redux store
 *
 * @returns A string that contains the error message
 *
 */
export const getLastErrorMessage = (state: RootState): string => state.errors.lastErrorMessage;

/**
 * Returns true if there was erros for the createUser or the updateUser api call
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getIsCreateOrUpdateUserOnError = (state: RootState): boolean =>
  state.errors[createUser.typePrefix] || state.errors[updateUser.typePrefix] ? true : false;

export default errorsSlice.reducer;
