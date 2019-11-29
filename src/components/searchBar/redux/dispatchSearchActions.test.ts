import { RouterActionType } from 'connected-react-router';
import { Constants } from '../../../app/AppConstants';
import { Action } from '../../../app/redux/actions';
import { CollectionSearchRequest } from '../../../types/CollectionSearchRequest';
import { VideoSearchRequest } from '../../../types/VideoSearchRequest';
import { MockStoreFactory } from './../../../../test-support/factories';
import { dispatchSearchActions } from './dispatchSearchActions';
import { searchVideosAction } from './actions/searchVideosActions';
import { searchCollectionsAction } from './actions/searchCollectionsActions';

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

  it('filters the results by CLASSROOM and excludes NEWS by default', () => {
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

  it('defaults durations to undefined if non-existent', () => {
    const store = getStore();
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.duration_min).toBeUndefined();
    expect(action.payload.filters.duration_max).toBeUndefined();
  });

  it('filters by subject', () => {
    const store = getStore('subject=subject-one-id');
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.subject).toContain('subject-one-id');
  });

  it('filters by multiple subjects', () => {
    const store = getStore('subject=subject-one-id,subject-two-id');
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.subject).toEqual([
      'subject-one-id',
      'subject-two-id',
    ]);
  });

  it('filters by age range', () => {
    const store = getStore('age_range_min=4&age_range_max=12');
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.age_range_min).toEqual(4);
    expect(action.payload.filters.age_range_max).toEqual(12);
  });

  it('does not search for collections when filters are applied', () => {
    const store = getStore('age_range_min=4&age_range_max=12');
    dispatchSearchActions(store);

    const actions = store.getActions();

    expect(actions).toHaveLength(1);

    expect(actions[0].type).toEqual(searchVideosAction.type);
  });

  it('does search for collections when filters are not applied', () => {
    const store = getStore();
    dispatchSearchActions(store);

    const actions = store.getActions();

    expect(actions).toHaveLength(2);

    expect(actions[0].type).toContain(searchVideosAction.type);
    expect(actions[1].type).toContain(searchCollectionsAction.type);
  });

  it('defaults subjects to undefined if not present', () => {
    const store = getStore();
    dispatchSearchActions(store);

    const action: Action<VideoSearchRequest> = store.getActions()[0];
    expect(action.payload.filters.subject).toBeUndefined();
  });
});
