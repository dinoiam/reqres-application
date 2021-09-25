import { createSlice } from '@reduxjs/toolkit';
import { User } from '@src/models/user';
import { addOrReplaceArrayOfObjectByKey, addOrReplaceObjectByKey } from '@src/utils/array';
import { RootState } from '..';
import { createUser, fetchUsers, fetchUsersById, updateUser } from '../action/user';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    nextPage: 1,
    list: [] as Array<User>,
    moreUsers: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.list = addOrReplaceArrayOfObjectByKey(state.list, payload.data, 'id');
        state.moreUsers = payload.page < payload.total_pages;
        state.nextPage = Math.min(payload.page + 1, payload.total_pages);
      })
      .addCase(fetchUsersById.fulfilled, (state, { payload }) => {
        state.list = addOrReplaceObjectByKey(state.list, payload.data, 'id');
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.list = addOrReplaceObjectByKey(state.list, payload, 'id');
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.list = addOrReplaceObjectByKey(state.list, payload, 'id');
      });
  }
});

/**
 * Returns a boolean, true if there are more users to fetch, false otherwise
 *
 * @param state - The redux store
 *
 * @returns A boolean
 *
 */
export const getMoreUsers = (state: RootState): boolean => state.users.moreUsers;
/**
 * Returns the number of the next page.
 *
 * @param state - The redux store
 *
 * @returns A number
 *
 */
export const getNextPage = (state: RootState): number => state.users.nextPage;
/**
 * Returns all users inside the store.
 *
 * @param state - The redux store
 *
 * @returns An array of user object
 *
 */
export const getUsersList = (state: RootState): Array<User> => state.users.list;
/**
 * Returns the user with the given id or undefined.
 *
 * @param state - The redux store
 * @param userId - The user id
 *
 * @returns An user object or undefined
 *
 */
export const getUserById = (state: RootState, userId: number | string): User | undefined =>
  state.users.list.find((user) => user.id === +userId);

export default userSlice.reducer;
