import { RouterActionType } from 'connected-react-router';
import { Constants } from '../../../app/AppConstants';
import { Action } from '../../../app/redux/actions';
import { VideoSearchRequest } from '../../../types/VideoSearchRequest';
import { MockStoreFactory } from './../../../../test-support/factories';
import { dispatchSearchVideoAction } from './dispatchSearchVideoAction';

function getStore(mode: string = '') {
  return MockStoreFactory.sample({
    router: {
      location: {
        pathname: '/videos',
        search: '?q=Testing123&page=3&mode=' + mode,
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

  dispatchSearchVideoAction(store);

  expect(store.getActions()).toHaveLength(0);
});

describe('when on the videos page', () => {
  it('passes the query into the action', () => {
    const store = getStore();

    dispatchSearchVideoAction(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.query).toEqual('Testing123');
  });

  it('passes the expected page number into the action', () => {
    const store = getStore();

    dispatchSearchVideoAction(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.page).toEqual(3);
  });

  it('sorts the results by release date when mode is news', () => {
    const store = getStore(Constants.NEWS);

    dispatchSearchVideoAction(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.sortBy).toEqual('RELEASE_DATE');
  });

  it('filters the results by NEWS and CLASSROOM tags if mode is news', () => {
    const store = getStore(Constants.NEWS);

    dispatchSearchVideoAction(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.filters.includeTags).toEqual([
      Constants.NEWS,
      Constants.CLASSROOM,
    ]);
  });

  it('filters the results by CLASSROOM, and excludes NEWS if mode is not news', () => {
    const store = getStore();

    dispatchSearchVideoAction(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];

    expect(action).toBeTruthy();
    expect(action.payload.filters.includeTags).toEqual([Constants.CLASSROOM]);
    expect(action.payload.filters.excludeTags).toEqual([Constants.NEWS]);
  });
});
