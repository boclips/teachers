import { RouterActionType } from 'connected-react-router';
import { Constants } from '../../../app/AppConstants';
import { Action } from '../../../app/redux/actions';
import { CollectionSearchRequest } from '../../../types/CollectionSearchRequest';
import { VideoSearchRequest } from '../../../types/VideoSearchRequest';
import { MockStoreFactory } from './../../../../test-support/factories';
import { dispatchSearchActions } from './dispatchSearchActions';

function getStore(params: string = '') {
  return MockStoreFactory.sample({
    router: {
      location: {
        pathname: '/videos',
        search: '?q=Testing123&page=3&' + params,
        state: {},
        hash: '',
      },
      action: 'POP' as RouterActionType,
    },
  });
}

it('does not dispatch a SearchRequest when not on a videos page', () => {
  const store = MockStoreFactory.sample({
    router: {
      location: {
        pathname: '',
        search: '',
        state: {},
        hash: '',
      },
      action: 'POP' as RouterActionType,
    },
  });

  dispatchSearchActions(store);

  expect(store.getActions()).toHaveLength(0);
});

describe('when on the videos page', () => {
  it('passes the query into the action', () => {
    const store = getStore();

    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.query).toEqual('Testing123');
  });

  it('passes the expected page number into the action', () => {
    const store = getStore();

    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.page).toEqual(3);
  });

  it('sorts the results by release date when mode is news', () => {
    const store = getStore(`mode=${Constants.NEWS}`);

    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.sortBy).toEqual('RELEASE_DATE');
  });

  it('filters the results by NEWS and CLASSROOM tags if mode is news', () => {
    const store = getStore(`mode=${Constants.NEWS}`);

    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.filters.includeTags).toEqual([
      Constants.NEWS,
      Constants.CLASSROOM,
    ]);
  });

  it('filters the results by CLASSROOM, and excludes NEWS if mode is not news', () => {
    const store = getStore();

    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.filters.includeTags).toEqual([Constants.CLASSROOM]);
    expect(action.payload.filters.excludeTags).toEqual([Constants.NEWS]);
  });

  it('searches collections', () => {
    const store = getStore();

    dispatchSearchActions(store);

    const action: Action<CollectionSearchRequest> = store.getActions()[1];

    expect(action).toBeTruthy();
    expect(action.payload.query).toEqual('Testing123');
  });

  it('filters by duration', () => {
    const store = getStore(`duration_min=60&duration_max=190`);
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.duration_min).toEqual(60);
    expect(action.payload.filters.duration_max).toEqual(190);
  });

  it('defaults durations to undefined if non-existant', () => {
    const store = getStore();
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.duration_min).toBeUndefined();
    expect(action.payload.filters.duration_max).toBeUndefined();
  });
});
