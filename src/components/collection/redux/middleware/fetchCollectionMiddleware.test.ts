import configureStore from 'redux-mock-store';
import eventually from '../../../../../test-support/eventually';
import { VideoCollectionFactory } from '../../../../../test-support/factories';
import { fetchCollection } from '../../../../services/collections/fetchCollection';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';
import Mock = jest.Mock;

jest.mock('../../../../services/collections/fetchCollection');
const fetchCollectionMock = fetchCollection as Mock;
const mockStore = configureStore<{}>([fetchCollectionMiddleware]);

test('dispatches a store action per successfully fetched collection', async () => {
  const collection = VideoCollectionFactory.sample();
  const store = mockStore({ links: { entries: [], loadingState: 'success' } });

  fetchCollectionMock.mockReturnValue(Promise.resolve(collection));

  store.dispatch(fetchCollectionAction('collection-id'));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeCollectionAction(collection),
    );
  });
});
