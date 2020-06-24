import Mock = jest.Mock;
import configureStore from 'redux-mock-store';
import { VideoCollectionFactory } from 'test-support/factories';
import { fetchCollection } from 'src/services/collections/fetchCollection';
import eventually from '../../../../../test-support/eventually';
import { fetchCollectionAction } from '../actions/fetchCollectionAction';
import { storeCollectionAction } from '../actions/storeCollectionAction';
import fetchCollectionMiddleware from './fetchCollectionMiddleware';

jest.mock('../../../../services/collections/fetchCollection');
const fetchCollectionMock = fetchCollection as Mock;
const mockStore = configureStore<{}>([fetchCollectionMiddleware]);

test('dispatches a store action per successfully fetched collection', async () => {
  const collection = VideoCollectionFactory.sample();
  const store = mockStore({ links: { entries: [], loadingState: 'success' } });

  fetchCollectionMock.mockReturnValue(Promise.resolve(collection));

  store.dispatch(fetchCollectionAction({ id: 'collection-id' }));

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeCollectionAction(collection),
    );
  });
});

test('dispatches a store action per successfully fetched collection by referer and shareCode', async () => {
  const collection = VideoCollectionFactory.sample();
  const store = mockStore({ links: { entries: [], loadingState: 'success' } });

  fetchCollectionMock.mockReturnValue(Promise.resolve(collection));

  store.dispatch(
    fetchCollectionAction({
      id: 'collection-id',
      shareCode: 'abc',
      referer: 'user-id',
    }),
  );

  await eventually(() => {
    expect(store.getActions()).toContainEqual(
      storeCollectionAction(collection),
    );
  });
});
