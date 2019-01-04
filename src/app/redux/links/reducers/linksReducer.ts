import { Reducer } from 'redux';
import { Links } from '../../../../types/Links';
import createReducer, { actionHandler } from '../../createReducer';
import { storeLinksAction } from '../actions/storeLinksAction';

export const linksReducer: Reducer<Links> = createReducer(
  null,
  actionHandler(storeLinksAction, (_, links) => links),
);
