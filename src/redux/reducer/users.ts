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

// export const getIsUserAuthenticated = (state: RootState): boolean => state.auth.isUserAuthenticated;
export const getMoreUsers = (state: RootState): boolean => state.users.moreUsers;
export const getNextPage = (state: RootState): number => state.users.nextPage;
export const getUsersList = (state: RootState): Array<User> => state.users.list;
export const getUserById = (state: RootState, userId: number | string): User | undefined =>
  state.users.list.find((user) => user.id === +userId);

export default userSlice.reducer;
