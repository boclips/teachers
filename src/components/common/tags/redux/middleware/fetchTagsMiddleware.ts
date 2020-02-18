import { MiddlewareAPI } from 'redux';
import { sideEffect } from 'src/app/redux/actions';
import { fetchTags } from 'src/services/tags/fetchTags';
import { Tag } from 'src/types/Tag';
import { Links } from 'src/types/Links';
import { fetchTagsAction } from '../actions/fetchTagsAction';
import { fetchedTagsAction } from '../actions/fetchedTagsAction';

export function onFetchTags(store: MiddlewareAPI) {
  const links: Links = store.getState().links.entries;

  fetchTags(links).then((tags: Tag[]) => {
    store.dispatch(fetchedTagsAction(tags));
  });
}

export default sideEffect(fetchTagsAction, onFetchTags);
