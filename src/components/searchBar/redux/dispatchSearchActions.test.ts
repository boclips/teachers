import { RouterActionType } from 'connected-react-router';
import { Action } from '../../../app/redux/actions';
import { CollectionSearchRequest } from '../../../types/CollectionSearchRequest';
import { VideoSearchRequest } from '../../../types/VideoSearchRequest';
import { VideoType } from '../../../types/Video';
import { MockStoreFactory } from '../../../../test-support/factories';
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
  let store;
  let action: Action<VideoSearchRequest>;

  beforeEach(() => {
    store = getStore();
    dispatchSearchActions(store);

    action = store.getActions()[0];
  });

  it('passes the query into the action', () => {
    expect(action).toBeTruthy();
    expect(action.payload.query).toEqual('Testing123');
  });

  it('passes the expected page number into the action', () => {
    expect(action).toBeTruthy();
    expect(action.payload.page).toEqual(3);
  });

  it('filters the results by non-NEWS types', () => {
    expect(action).toBeTruthy();
    expect(action.payload.filters.type).toHaveLength(2);
    expect(action.payload.filters.type).toEqual(
      expect.arrayContaining([VideoType.INSTRUCTIONAL, VideoType.STOCK]),
    );
  });

  it('searches collections', () => {
    const collectionSearchAction: Action<CollectionSearchRequest> = store.getActions()[1];

    expect(collectionSearchAction).toBeTruthy();
    expect(collectionSearchAction.payload.query).toEqual('Testing123');
  });

  it('filters by duration lower and upper', () => {
    store = getStore(`duration=60-190`);
    dispatchSearchActions(store);
    action = store.getActions()[0];

    expect(action.payload.filters.duration[0].toString()).toEqual('60-190');
  });

  it('defaults duration to undefined if non-existent', () => {
    expect(action.payload.filters.duration).toBeNull();
  });

  it('filters videos by subject', () => {
    store = getStore('subject=subject-one-id');
    dispatchSearchActions(store);
    action = store.getActions()[0];

    expect(action.payload.filters.subject).toContain('subject-one-id');
  });

  it('filters videos by multiple subjects', () => {
    store = getStore('subject=subject-one-id&subject=subject-two-id');
    dispatchSearchActions(store);
    action = store.getActions()[0];

    expect(action.payload.filters.subject).toEqual([
      'subject-one-id',
      'subject-two-id',
    ]);
  });

  it('filters collections by subject', () => {
    store = getStore('subject=subject-one-id');
    dispatchSearchActions(store);
    const collectionSearchAction = store.getActions()[1];

    expect(collectionSearchAction.payload.filters.subject).toContain(
      'subject-one-id',
    );
  });

  it('filters collections by multiple subjects', () => {
    store = getStore('subject=subject-one-id&subject=subject-two-id');
    dispatchSearchActions(store);
    const collectionSearchAction = store.getActions()[1];

    expect(collectionSearchAction.payload.filters.subject).toEqual([
      'subject-one-id',
      'subject-two-id',
    ]);
  });

  it('filters by age range', () => {
    store = getStore('age_range_min=4&age_range_max=12');
    dispatchSearchActions(store);
    const videoAction = store.getActions()[0];
    const collectionAction = store.getActions()[1];

    expect(videoAction.payload.filters.age_range_min).toEqual(4);
    expect(videoAction.payload.filters.age_range_max).toEqual(12);
    expect(collectionAction.payload.filters.age_range_min).toEqual(4);
    expect(collectionAction.payload.filters.age_range_max).toEqual(12);
  });

  it('defaults subjects to undefined if not present', () => {
    expect(action.payload.filters.subject).toBeUndefined();
  });
});
