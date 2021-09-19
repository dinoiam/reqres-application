import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@src/api/axios';
import { GetUserResponse } from '@src/types/user';

export const fetchUsers = createAsyncThunk<
  GetUserResponse,
  {
    page?: number;
  },
  {
    rejectValue: {
      errorMessage: string;
    };
  }
>('user/fetchUsers', async ({ page = 1 }, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get<GetUserResponse>(`users?page=${page}&per_page=3`);
    return data;
  } catch (e: any) {
    const errorMessage = e?.response?.data?.error ?? '';
    return thunkAPI.rejectWithValue({ errorMessage: errorMessage });
  }
});
