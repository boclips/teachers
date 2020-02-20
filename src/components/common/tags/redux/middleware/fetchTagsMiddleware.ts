import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../../app/redux/actions';
import { fetchTags } from '../../../../../services/tags/fetchTags';
import { Tag } from '../../../../../types/Tag';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';
import { fetchTagsAction } from '../actions/fetchTagsAction';
import { Links } from '../../../../../types/Links';

export function onFetchTags(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchTags(links).then((tags: Tag[]) => {
    store.dispatch(fetchedTagsAction(tags));
  });
}

export default sideEffect(fetchTagsAction, onFetchTags);
