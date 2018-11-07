import { Reducer } from 'redux';
import { storeLinksAction } from '../config/ConfigLoader';
import createReducer, { actionHandler } from '../redux/createReducer';
import { Links } from './Links';

export const linksReducer: Reducer<Links> = createReducer(
  null,
  actionHandler(storeLinksAction, (_, links) => links),
);
