import { Store } from 'redux';
import { sideEffect } from '../../../../redux/actions';
import fetchLinks from '../../../api/fetchLinks';
import { fetchLinksAction } from '../actions/fetchLinksAction';
import { storeLinksAction } from '../actions/storeLinksAction';

export default sideEffect(fetchLinksAction, (store: Store) => {
  fetchLinks()
    .then(storeLinksAction)
    .then(store.dispatch);
});
