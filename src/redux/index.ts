import { configureStore } from '@reduxjs/toolkit';
import { middleware } from './middleware';
import authReducer from './reducer/auth';
import usersReducer from './reducer/users';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
