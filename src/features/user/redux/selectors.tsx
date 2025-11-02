import type { RootState } from '../../../redux/store';

export const selectIsLoggedIn = (state: RootState) => !!state.user.email;
export const selectName = (state: RootState) => state.user.name;
export const selectEmail = (state: RootState) => state.user.email;
export const selectIsEmailVerified = (state: RootState) =>
  state.user.isEmailConfirmed;
export const selectIsRefreshing = (state: RootState) => state.user.isRefreshing;
