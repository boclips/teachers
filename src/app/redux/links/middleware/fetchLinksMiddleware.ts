import { Store } from 'redux';
import fetchLinks from '../../../../services/links/fetchLinks';
import { sideEffect } from '../../actions';
import { fetchLinksAction } from '../actions/fetchLinksAction';
import { storeLinksAction } from '../actions/storeLinksAction';
import initializeState from './dispatchAfterLinksFetched';

export default sideEffect(fetchLinksAction, (store: Store) => {
  fetchLinks()
    .then(links => initializeState(links, store.dispatch))
    .then(storeLinksAction)
    .then(store.dispatch);
});
