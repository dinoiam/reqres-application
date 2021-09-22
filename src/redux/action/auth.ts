import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@src/api/axios';
import { LoginRequest, LoginRequestSuccessful } from '@src/models/auth';

export const login = createAsyncThunk<
  LoginRequestSuccessful,
  LoginRequest,
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('login', async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post<LoginRequestSuccessful>(`login`, {
      email,
      password
    });
    return {
      token: data.token
    };
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});

export const logout = createAction('logout');
