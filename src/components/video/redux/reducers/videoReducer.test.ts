import {
  EntitiesFactory,
  MockStoreFactory,
  VideoFactory,
} from 'test-support/factories';
import { createReducer } from 'src/app/redux/createReducer';
import { storePromotedVideosAction } from '../actions/storePromotedVideosAction';
import { storeVideosAction } from '../actions/storeVideosAction';
import { storeVideoAction } from './../actions/storeVideoAction';
import {
  getPromotedVideos,
  getVideosByIds,
  videoHandlers,
} from './videoReducer';

const testReducer = createReducer(...videoHandlers);

describe('storing videos', () => {
  it('can store a single video', () => {
    const stateBefore = MockStoreFactory.sampleState({});

    const videoToSave = VideoFactory.sample();
    const action = storeVideoAction(videoToSave);

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.entities.videos.byId[videoToSave.id]).toEqual(
      videoToSave,
    );
    expect(stateAfter.video.id).toEqual({
      value: videoToSave.id,
      links: videoToSave.links,
    });
    expect(stateAfter.video.loading).toEqual(false);
  });

  it('can store many videos', () => {
    const stateBefore = MockStoreFactory.sampleState({});

    const firstVideo = VideoFactory.sample({ id: 'v1' });
    const secondVideo = VideoFactory.sample({ id: 'v2' });
    const action = storeVideosAction({ videos: [firstVideo, secondVideo] });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.entities.videos.byId[firstVideo.id]).toEqual(firstVideo);
    expect(stateAfter.entities.videos.byId[secondVideo.id]).toEqual(
      secondVideo,
    );
  });

  it('can store a list of promoted videos', () => {
    const stateBefore = MockStoreFactory.sampleState({});

    const firstVideo = VideoFactory.sample({ id: 'v1' });
    const action = storePromotedVideosAction({ promotedVideos: [firstVideo] });

    const stateAfter = testReducer(stateBefore, action);

    expect(stateAfter.videos.promotedVideoIds).toEqual([firstVideo.id]);
    expect(stateAfter.entities.videos.byId[firstVideo.id]).toEqual(firstVideo);
  });
});

describe('video selectors', () => {
  it('can get a list of videos from the store given a list of ids', () => {
    const firstVideo = VideoFactory.sample({ id: 'v1' });
    const secondVideo = VideoFactory.sample({ id: 'v2' });
    const state = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        videos: {
          byId: {
            [firstVideo.id]: firstVideo,
            [secondVideo.id]: secondVideo,
          },
        },
      }),
    });

    const fetchedVideos = getVideosByIds(state, [
      firstVideo.id,
      secondVideo.id,
    ]);

    expect(fetchedVideos).toEqual([firstVideo, secondVideo]);
  });

  it('can get a list of promoted videos from the store', () => {
    const promotedVideo = VideoFactory.sample({ id: 'v1', promoted: true });
    const notPromotedVideo = VideoFactory.sample({ id: 'v2' });
    const state = MockStoreFactory.sampleState({
      videos: {
        promotedVideoIds: [promotedVideo.id],
      },
      entities: EntitiesFactory.sample({
        videos: {
          byId: {
            [promotedVideo.id]: promotedVideo,
            [notPromotedVideo.id]: notPromotedVideo,
          },
        },
      }),
    });

    const fetchedVideos = getPromotedVideos(state);

    expect(fetchedVideos).toEqual([promotedVideo]);
  });
});
