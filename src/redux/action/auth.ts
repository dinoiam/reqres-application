import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@src/api/axios';
import { ApiRequestUnsuccessful } from '@src/models';
import { LoginRequestError, LoginRequestPayload, LoginRequestSuccessful } from '@src/models/auth';

export const login = createAsyncThunk<
  LoginRequestSuccessful,
  LoginRequestPayload,
  LoginRequestError
>('login', async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post<LoginRequestSuccessful>(`login`, {
      email,
      password
    });
    return {
      token: data.token
    };
  } catch (e: unknown) {
    const errorMessage = (e as ApiRequestUnsuccessful)?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});

export const logout = createAction('logout');
