import State from 'src/types/State';

export const isAuthenticated = (state: State): boolean =>
  state.authentication?.status === 'authenticated';
