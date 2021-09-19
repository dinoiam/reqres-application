import { createSlice } from '@reduxjs/toolkit';
import { User } from '@src/types/user';
import { RootState } from '..';
import { fetchUsers } from '../action/user';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    nextPage: 1,
    list: [] as Array<User>,
    moreUsers: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.list = [...state.list, ...payload.data];
      state.moreUsers = payload.page < payload.total_pages;
      state.nextPage = Math.min(payload.page + 1, payload.total_pages);
    });
  }
});

// export const getIsUserAuthenticated = (state: RootState): boolean => state.auth.isUserAuthenticated;
export const getMoreUsers = (state: RootState): boolean => state.users.moreUsers;
export const getNextPage = (state: RootState): number => state.users.nextPage;
export const getUsersList = (state: RootState): Array<User> => state.users.list;

export default userSlice.reducer;
