import { Reducer } from 'redux';
import createReducer, { actionHandler } from '../../../../redux/createReducer';
import { Links } from '../../Links';
import { storeLinksAction } from '../actions/storeLinksAction';

export const linksReducer: Reducer<Links> = createReducer(
  null,
  actionHandler(storeLinksAction, (_, links) => links),
);
