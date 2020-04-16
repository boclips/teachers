import { Store } from 'redux';
import fetchLinks from '../../../../services/links/fetchLinks';
import { sideEffect } from '../../actions';
import { fetchLinksAction } from '../actions/fetchLinksAction';
import { storeLinksAction } from '../actions/storeLinksAction';
import { fetchLinksFailureAction } from '../actions/fetchLinksFailureAction';

export default sideEffect(fetchLinksAction, (store: Store) => {
  fetchLinks(store.getState().apiPrefix).then(
    (links) => store.dispatch(storeLinksAction(links)),
    (_error) => store.dispatch(fetchLinksFailureAction()),
  );
});
