import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import Mock = jest.Mock;
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import { VideoCollectionFactory } from './../../../../../test-support/factories';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';

jest.mock('../../../../services/collections/fetchCollection');
const fetchCollectionMock = fetchCollection as Mock;
const mockStore = configureStore<{}>([fetchCollectionMiddleware]);

test('dispatches a store action per successfully fetched collection', async () => {
  const collection = VideoCollectionFactory.sample();
  const store = mockStore({});
  fetchCollectionMock.mockReturnValue(Promise.resolve(collection));

  store.dispatch(fetchCollectionAction('collection-id'));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeCollectionAction(collection),
    );
  });
});
