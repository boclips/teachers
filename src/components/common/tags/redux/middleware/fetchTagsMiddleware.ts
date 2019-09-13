import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchTags } from '../../../../../services/tags/fetchTags';
import State from '../../../../../types/State';
import { Tag } from '../../../../../types/Tag';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';
import { fetchTagsAction } from '../actions/fetchTagsAction';

export function onFetchTags(store: MiddlewareAPI) {
  const state: State = store.getState();

  fetchTags(state.links).then((tags: Tag[]) => {
    store.dispatch(fetchedTagsAction(tags));
  });
}

export default sideEffect(fetchTagsAction, onFetchTags);
