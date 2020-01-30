import { Links } from '../../../../types/Links';
import { ActionHandler, actionHandler } from '../../createReducer';
import { storeLinksAction } from '../actions/storeLinksAction';
import State from '../../../../types/State';
import { fetchLinksAction } from '../actions/fetchLinksAction';
import { fetchLinksFailureAction } from '../actions/fetchLinksFailureAction';

const onStoreLinksAction = (state: State, links: Links): State => ({
  ...state,
  links: {
    entries: links,
    loadingState: 'success',
  },
});

const onFetchLinksAction = (state: State): State => ({
  ...state,
  links: {
    ...state.links,
    loadingState: 'loading',
  },
});

const onFetchLinksFailureAction = (state: State): State => ({
  ...state,
  links: {
    ...state.links,
    loadingState: 'failure',
  },
});

export const linkHandlers: Array<ActionHandler<State, any>> = [
  actionHandler(fetchLinksAction, onFetchLinksAction),
  actionHandler(storeLinksAction, onStoreLinksAction),
  actionHandler(fetchLinksFailureAction, onFetchLinksFailureAction),
];
