import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  login,
  logout,
  refresh,
  confirmEmail,
  updateUserData,
  resetPassword,
} from './operations.tsx';

export type UserState = {
  name: string;
  email: string;
  isEmailConfirmed: boolean;
  isLoggedIn: boolean;
  isRefreshing: boolean;
};

type AuthPayload = Pick<UserState, 'name' | 'email' | 'isEmailConfirmed'>;

const initialState: UserState = {
  name: '',
  email: '',
  isEmailConfirmed: false,
  isLoggedIn: false,
  isRefreshing: true,
};

const slice = createSlice({
  name: 'user',

  initialState,

  reducers: {
    clearEmail: state => ({ ...state, email: '' }),
  },

  extraReducers: builder =>
    builder
      .addCase(
        confirmEmail.fulfilled,
        (_, action: PayloadAction<AuthPayload>) => ({
          ...action.payload,
          isLoggedIn: true,
          isRefreshing: false,
        })
      )
      .addCase(logout.fulfilled, () => ({
        ...initialState,
        isRefreshing: false,
      }))
      .addCase(login.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          ...action.payload,
          isEmailVerified: true,
          isLoggedIn: true,
        };
      })
      .addCase(
        resetPassword.fulfilled,
        (_, action: PayloadAction<AuthPayload>) => ({
          ...action.payload,
          isLoggedIn: true,
          isRefreshing: false,
        })
      )
      .addCase(
        refresh.fulfilled,
        (_, action: PayloadAction<AuthPayload>) => ({
          ...action.payload,
          isLoggedIn: true,
          isRefreshing: false,
        })
      )
      .addCase(updateUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
      }))
      .addCase(refresh.rejected, state => ({
        ...state,
        isRefreshing: false,
      })),
});

export const { clearEmail } = slice.actions;

export default slice.reducer;
