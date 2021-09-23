import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@src/api/axios';
import {
  GetUsersResponse,
  User,
  FetchUsersRequestPayload,
  FetchUsersRequestError
} from '@src/models/user';

export const fetchUsers = createAsyncThunk<
  GetUsersResponse,
  FetchUsersRequestPayload,
  FetchUsersRequestError
>('user/fetchUsers', async ({ page = 1 }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<GetUsersResponse>(`users?page=${page}&per_page=4`);
    return data;
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});

export const fetchUsersById = createAsyncThunk<
  { data: User },
  {
    userId: string;
  },
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('user/fetchById', async ({ userId }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<{ data: User }>(`users/${userId}`);
    return data;
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});

export const createUser = createAsyncThunk<
  User,
  {
    firstName: string;
    lastName: string;
    email: string;
  },
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('user/create', async ({ firstName, lastName, email }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post<User>(`users`, {
      first_name: firstName,
      last_name: lastName,
      email
    });
    return data;
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});

export const updateUser = createAsyncThunk<
  User,
  {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
  },
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('user/update', async ({ firstName, lastName, email, userId }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.patch<Omit<User, 'id'>>(`users/${userId}`, {
      first_name: firstName,
      last_name: lastName,
      email
    });
    return { ...data, id: +userId };
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});
