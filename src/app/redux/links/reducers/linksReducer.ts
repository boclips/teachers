import { Reducer } from 'redux';
import { Links } from '../../../../types/Links';
import createReducerWithInitialState, {
  actionHandler,
} from '../../createReducer';
import { storeLinksAction } from '../actions/storeLinksAction';

export const linksReducer: Reducer<Links> = createReducerWithInitialState(
  null,
  actionHandler(storeLinksAction, (_, links) => links),
);
