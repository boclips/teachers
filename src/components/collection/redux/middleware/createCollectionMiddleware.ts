import { MiddlewareAPI } from 'redux';
import { sideEffect } from '../../../../app/redux/actions';
import {
  createCollection,
  CreateCollectionRequest,
} from '../../../../services/collections/createCollection';
import NotificationFactory from '../../../common/NotificationFactory';
import { createCollectionAction } from '../actions/createCollectionAction';
import { fetchCollectionsAction } from '../actions/fetchCollectionsAction';
import { onCreateCollectionAction } from '../actions/onCreateCollectionAction';
import { Links } from '../../../../types/Links';

export function onCreateCollection(
  store: MiddlewareAPI,
  request: CreateCollectionRequest,
) {
  const links: Links = store.getState().links.entries;
  createCollection(links, request)
    .then(() => {
      store.dispatch(onCreateCollectionAction());
      store.dispatch(fetchCollectionsAction('myCollections'));
      store.dispatch(fetchCollectionsAction('myResources'));
    })
    .catch(() => {
      NotificationFactory.error({ message: 'Error creating collection.' });
    });
}

export default sideEffect(createCollectionAction, onCreateCollection);
