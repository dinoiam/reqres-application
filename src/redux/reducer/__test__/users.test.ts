/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '@src/models/user';
import { createUser, fetchUsers, fetchUsersById, updateUser } from '@src/redux/action/user';
import usersReducer, { getMoreUsers, getNextPage, getUserById, getUsersList } from '../users';

const initialState = {
  nextPage: 1,
  list: [] as Array<User>,
  moreUsers: true
};

const initialStateNotEmpty = {
  nextPage: 1,
  list: [
    {
      id: 1,
      email: 'initial_email_test',
      first_name: 'initial_first_name_test',
      last_name: 'initial_last_name_test',
      avatar: 'initial_avatar_test'
    },
    {
      id: 2,
      email: 'initial_email_test',
      first_name: 'initial_first_name_test',
      last_name: 'initial_last_name_test',
      avatar: 'initial_avatar_test'
    },
    {
      id: 3,
      email: 'initial_email_test',
      first_name: 'initial_first_name_test',
      last_name: 'initial_last_name_test',
      avatar: 'initial_avatar_test'
    }
  ],
  moreUsers: true
};

const userPayload = {
  page: 1,
  per_page: 6,
  total: 12,
  total_pages: 2,
  data: [
    {
      id: 1,
      email: 'email_test',
      first_name: 'first_name_test',
      last_name: 'last_name_test',
      avatar: 'avatar_test'
    }
  ]
};

describe('usersReducer', () => {
  describe('when the initial state is empty', () => {
    describe('on fetchUsers.fulfilled', () => {
      test('it sets the list', () => {
        expect(
          usersReducer(initialState, { type: fetchUsers.fulfilled.type, payload: userPayload })
        ).toEqual(
          expect.objectContaining({
            list: [
              {
                avatar: 'avatar_test',
                email: 'email_test',
                first_name: 'first_name_test',
                id: 1,
                last_name: 'last_name_test'
              }
            ]
          })
        );
      });

      test('it sets nextPage to 1', () => {
        expect(
          usersReducer(initialState, { type: fetchUsers.fulfilled.type, payload: userPayload })
        ).toEqual(
          expect.objectContaining({
            nextPage: 2
          })
        );
      });

      test('it sets moreUsers to true', () => {
        expect(
          usersReducer(initialState, { type: fetchUsers.fulfilled.type, payload: userPayload })
        ).toEqual(
          expect.objectContaining({
            moreUsers: true
          })
        );
      });

      test('it sets moreUsers to false', () => {
        expect(
          usersReducer(initialState, {
            type: fetchUsers.fulfilled.type,
            payload: { ...userPayload, page: 2 }
          })
        ).toEqual(
          expect.objectContaining({
            nextPage: 2,
            moreUsers: false
          })
        );
      });
    });

    describe('on fetchUsersById.fulfilled', () => {
      test('it sets the list', () => {
        const mockUser = {
          id: 7,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialState, {
            type: fetchUsersById.fulfilled.type,
            payload: { data: mockUser }
          })
        ).toEqual(
          expect.objectContaining({
            list: [mockUser]
          })
        );
      });
    });

    describe('on createUser.fulfilled', () => {
      test('it sets the list', () => {
        const mockUser = {
          id: 7,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialState, {
            type: createUser.fulfilled.type,
            payload: mockUser
          })
        ).toEqual(
          expect.objectContaining({
            list: [mockUser]
          })
        );
      });
    });

    describe('on updateUser.fulfilled', () => {
      test('it sets the list', () => {
        const mockUser = {
          id: 7,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialState, {
            type: updateUser.fulfilled.type,
            payload: mockUser
          })
        ).toEqual(
          expect.objectContaining({
            list: [mockUser]
          })
        );
      });
    });
  });

  describe('when the initial state is not empty', () => {
    describe('on fetchUsers.fulfilled', () => {
      test('it replace the users in the list if they are already present', () => {
        expect(
          usersReducer(initialStateNotEmpty, {
            type: fetchUsers.fulfilled.type,
            payload: userPayload
          })
        ).toEqual(
          expect.objectContaining({
            list: [
              {
                avatar: 'avatar_test',
                email: 'email_test',
                first_name: 'first_name_test',
                id: 1,
                last_name: 'last_name_test'
              },
              {
                id: 2,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              },
              {
                id: 3,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              }
            ]
          })
        );
      });
    });

    describe('on fetchUsersById.fulfilled', () => {
      test('it replace the users in the list if they are already present', () => {
        const mockUser = {
          id: 2,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialStateNotEmpty, {
            type: fetchUsersById.fulfilled.type,
            payload: { data: mockUser }
          })
        ).toEqual(
          expect.objectContaining({
            list: [
              {
                id: 1,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              },
              mockUser,
              {
                id: 3,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              }
            ]
          })
        );
      });
    });

    describe('on createUser.fulfilled', () => {
      test('it replace the users in the list if they are already present', () => {
        const mockUser = {
          id: 2,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialStateNotEmpty, {
            type: createUser.fulfilled.type,
            payload: mockUser
          })
        ).toEqual(
          expect.objectContaining({
            list: [
              {
                id: 1,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              },
              mockUser,
              {
                id: 3,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              }
            ]
          })
        );
      });
    });

    describe('on updateUser.fulfilled', () => {
      test('it replace the users in the list if they are already present', () => {
        const mockUser = {
          id: 2,
          email: 'email_test',
          first_name: 'first_name_test',
          last_name: 'last_name_test',
          avatar: 'avatar_test'
        };
        expect(
          usersReducer(initialStateNotEmpty, {
            type: updateUser.fulfilled.type,
            payload: mockUser
          })
        ).toEqual(
          expect.objectContaining({
            list: [
              {
                id: 1,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              },
              mockUser,
              {
                id: 3,
                email: 'initial_email_test',
                first_name: 'initial_first_name_test',
                last_name: 'initial_last_name_test',
                avatar: 'initial_avatar_test'
              }
            ]
          })
        );
      });
    });
  });
});

describe('getMoreUsers', () => {
  test('it should return moreUsers', () => {
    expect(
      getMoreUsers({
        users: {
          nextPage: 1,
          list: [] as Array<User>,
          moreUsers: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(true);
  });
});

describe('getNextPage', () => {
  test('it should return nextPage', () => {
    expect(
      getNextPage({
        users: {
          nextPage: 1,
          list: [] as Array<User>,
          moreUsers: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toBe(1);
  });
});

describe('getUserById', () => {
  test('it should return the user with the given id', () => {
    expect(
      getUserById(
        {
          users: {
            nextPage: 1,
            list: [
              {
                id: 1,
                email: 'initial_email_test_1',
                first_name: 'initial_first_name_test_1',
                last_name: 'initial_last_name_test_1',
                avatar: 'initial_avatar_test_1'
              },
              {
                id: 7,
                email: 'email_test_7',
                first_name: 'first_name_test_7',
                last_name: 'last_name_test_7',
                avatar: 'avatar_test_7'
              }
            ],
            moreUsers: true
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any,
        1
      )
    ).toEqual({
      id: 1,
      email: 'initial_email_test_1',
      first_name: 'initial_first_name_test_1',
      last_name: 'initial_last_name_test_1',
      avatar: 'initial_avatar_test_1'
    });
  });
});

describe('getUsersList', () => {
  test('it should return all the users', () => {
    const list = [
      {
        id: 1,
        email: 'initial_email_test_1',
        first_name: 'initial_first_name_test_1',
        last_name: 'initial_last_name_test_1',
        avatar: 'initial_avatar_test_1'
      },
      {
        id: 7,
        email: 'email_test_7',
        first_name: 'first_name_test_7',
        last_name: 'last_name_test_7',
        avatar: 'avatar_test_7'
      }
    ];
    expect(
      getUsersList({
        users: {
          nextPage: 1,
          list,
          moreUsers: true
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)
    ).toEqual(list);
  });
});
