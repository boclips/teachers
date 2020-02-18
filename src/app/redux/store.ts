import { History, createMemoryHistory } from 'history';
import { createStore } from 'redux';
import State from 'src/types/State';
import { createMiddleware } from '../middleware';
import { createReducers } from './reducers';

export const createBoclipsStore = (
  initialState: Partial<State>,
  history: History = createMemoryHistory(),
) =>
  createStore<State, any, any, any>(
    createReducers(history),
    initialState,
    createMiddleware(history),
  );
