import { Store } from 'redux';
import { fetchLinksAction, storeLinksAction } from '../config/ConfigLoader';
import { sideEffect } from '../redux/actions';
import fetchLinks from './fetchLinks';

export default sideEffect(fetchLinksAction, (store: Store) => {
  fetchLinks()
    .then(storeLinksAction)
    .then(store.dispatch);
});
