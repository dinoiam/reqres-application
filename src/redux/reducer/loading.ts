import {
  createSlice,
  isPending,
  isAnyOf,
  isRejected,
  isFulfilled,
  AnyAction
} from '@reduxjs/toolkit';
import { AnyAsyncThunk } from '@reduxjs/toolkit/dist/matchers';
import { RootState } from '..';
import { login } from '../action/auth';
import { fetchUsers, createUser, updateUser } from '../action/user';

const isRejectedOrFulfilled = (thunk: AnyAsyncThunk, action: AnyAction) => {
  return isAnyOf(isRejected(thunk), isFulfilled(thunk))(action);
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    [login.typePrefix]: false,
    [fetchUsers.typePrefix]: false,
    [createUser.typePrefix]: false,
    [updateUser.typePrefix]: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, action) => {
        if (isPending(login)(action)) state[login.typePrefix] = true;
        if (isPending(fetchUsers)(action)) state[fetchUsers.typePrefix] = true;
        if (isPending(createUser)(action)) state[createUser.typePrefix] = true;
        if (isPending(updateUser)(action)) state[updateUser.typePrefix] = true;
      })
      .addMatcher(isAnyOf(isRejected, isFulfilled), (state, action) => {
        if (isRejectedOrFulfilled(login, action)) state[login.typePrefix] = false;
        if (isRejectedOrFulfilled(fetchUsers, action)) state[fetchUsers.typePrefix] = false;
        if (isRejectedOrFulfilled(createUser, action)) state[createUser.typePrefix] = false;
        if (isRejectedOrFulfilled(updateUser, action)) state[updateUser.typePrefix] = false;
      });
  }
});

/**
 * Returns true if new users are fetching.
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getIsFetchingUsers = (state: RootState): boolean =>
  state.loading[fetchUsers.typePrefix];

/**
 * Returns true if the create user or the update user api call is on loading
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getIsCreatingOrUpdatingUser = (state: RootState): boolean =>
  state.loading[createUser.typePrefix] || state.loading[updateUser.typePrefix];

/**
 * Returns true if there is at least on api call loading
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getIsSomethingLoading = (state: RootState): boolean =>
  Object.keys(state.loading).some((key) => state.loading[key]);

export default loadingSlice.reducer;
