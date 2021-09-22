import { configureStore } from '@reduxjs/toolkit';
import { axiosInstance } from '@src/api/axios';
import { createUser, fetchUsers, fetchUsersById, updateUser } from '../user';
import usersReducer from '@src/redux/reducer/users';

jest.mock('@src/api/axios', () => ({
  axiosInstance: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn()
  }
}));

const mockGeUsersResponse = {
  page: 2,
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
    },
    {
      id: 7,
      email: 'email_test_7',
      first_name: 'first_name_test_7',
      last_name: 'last_name_test_7',
      avatar: 'avatar_test_7'
    }
  ]
};

const getStore = () => {
  return configureStore({
    reducer: {
      mock: usersReducer
    }
  });
};

describe('user', () => {
  afterEach(() => {
    // store.getState().users = { nextPage: 1, list: [], moreUsers: true };
    jest.resetAllMocks();
  });

  describe('fetchUsers', () => {
    test('it sets the page query param correctly', async () => {
      const store = getStore();
      (axiosInstance.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({ data: mockGeUsersResponse })
      );
      await store.dispatch(fetchUsers({}));
      expect(axiosInstance.get).toHaveBeenCalledWith('users?page=1&per_page=4');
      await store.dispatch(fetchUsers({ page: 3 }));
      expect(axiosInstance.get).toHaveBeenLastCalledWith('users?page=3&per_page=4');
    });

    describe('if the fetchUsers is successful', () => {
      test('it return the array of users inside the payload', async () => {
        const store = getStore();
        (axiosInstance.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockGeUsersResponse })
        );
        const result = await store.dispatch(fetchUsers({}));
        expect(result).toEqual(
          expect.objectContaining({
            type: fetchUsers.fulfilled.type,
            payload: mockGeUsersResponse
          })
        );
      });
    });

    describe('if the fetchUsers failed', () => {
      test('it return the errorMessage', async () => {
        const store = getStore();
        (axiosInstance.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject({
            response: {
              data: {
                error: 'fetchUsers failed'
              }
            }
          })
        );
        const result = await store.dispatch(fetchUsers({}));
        expect(result).toEqual(
          expect.objectContaining({
            type: fetchUsers.rejected.type,
            payload: { errorMessage: 'fetchUsers failed' }
          })
        );
      });
    });
  });

  describe('fetchUsersById', () => {
    describe('if the fetchUsersById is successful', () => {
      test('it return the array of users inside the payload', async () => {
        const store = getStore();

        (axiosInstance.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockGeUsersResponse.data[0] })
        );
        const result = await store.dispatch(fetchUsersById({ userId: '1' }));
        expect(axiosInstance.get).toHaveBeenCalledWith('users/1');
        expect(result).toEqual(
          expect.objectContaining({
            type: fetchUsersById.fulfilled.type,
            payload: mockGeUsersResponse.data[0]
          })
        );
      });
    });

    describe('if the fetchUsersById failed', () => {
      test('it return the errorMessage', async () => {
        const store = getStore();

        (axiosInstance.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject({
            response: {
              data: {
                error: 'fetchUsersById failed'
              }
            }
          })
        );
        const result = await store.dispatch(fetchUsersById({ userId: '1' }));
        expect(result).toEqual(
          expect.objectContaining({
            type: fetchUsersById.rejected.type,
            payload: { errorMessage: 'fetchUsersById failed' }
          })
        );
      });
    });
  });

  describe('createUser', () => {
    describe('if the createUser is successful', () => {
      test('it return the array of users inside the payload', async () => {
        const store = getStore();
        const mockNewUser = {
          email: 'test_email',
          firstName: 'test_firstName',
          lastName: 'test_lastName'
        };
        (axiosInstance.post as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: { id: 1, ...mockNewUser } })
        );
        const result = await store.dispatch(createUser(mockNewUser));
        expect(axiosInstance.post).toHaveBeenCalledWith('users', {
          email: 'test_email',
          first_name: 'test_firstName',
          last_name: 'test_lastName'
        });
        expect(result).toEqual(
          expect.objectContaining({
            type: createUser.fulfilled.type,
            payload: { id: 1, ...mockNewUser }
          })
        );
      });
    });

    describe('if the createUser failed', () => {
      test('it return the errorMessage', async () => {
        const store = getStore();
        const mockNewUser = {
          email: 'test_email',
          firstName: 'test_firstName',
          lastName: 'test_lastName'
        };
        (axiosInstance.post as jest.Mock).mockImplementationOnce(() =>
          Promise.reject({
            response: {
              data: {
                error: 'createUser failed'
              }
            }
          })
        );
        const result = await store.dispatch(createUser(mockNewUser));
        expect(result).toEqual(
          expect.objectContaining({
            type: createUser.rejected.type,
            payload: { errorMessage: 'createUser failed' }
          })
        );
      });
    });
  });

  describe('updateUser', () => {
    describe('if the updateUser is successful', () => {
      test('it return the array of users inside the payload', async () => {
        const store = getStore();
        const mockNewUser = {
          email: 'test_email',
          firstName: 'test_firstName',
          lastName: 'test_lastName'
        };
        (axiosInstance.patch as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: { id: 1, ...mockNewUser } })
        );
        const result = await store.dispatch(updateUser({ userId: '1', ...mockNewUser }));
        expect(axiosInstance.patch).toHaveBeenCalledWith('users/1', {
          email: 'test_email',
          first_name: 'test_firstName',
          last_name: 'test_lastName'
        });
        expect(result).toEqual(
          expect.objectContaining({
            type: updateUser.fulfilled.type,
            payload: { id: 1, ...mockNewUser }
          })
        );
      });
    });

    describe('if the updateUser failed', () => {
      test('it return the errorMessage', async () => {
        const store = getStore();
        const mockNewUser = {
          email: 'test_email',
          firstName: 'test_firstName',
          lastName: 'test_lastName'
        };
        (axiosInstance.patch as jest.Mock).mockImplementationOnce(() =>
          Promise.reject({
            response: {
              data: {
                error: 'updateUser failed'
              }
            }
          })
        );
        const result = await store.dispatch(updateUser({ userId: '1', ...mockNewUser }));
        expect(result).toEqual(
          expect.objectContaining({
            type: updateUser.rejected.type,
            payload: { errorMessage: 'updateUser failed' }
          })
        );
      });
    });
  });
});
