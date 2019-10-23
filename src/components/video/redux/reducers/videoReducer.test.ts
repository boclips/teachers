import { createReducer } from '../../../../app/redux/createReducer';
import { storeVideosAction } from '../actions/storeVideosAction';
import {
  MockStoreFactory,
  VideoFactory,
} from './../../../../../test-support/factories';
import { storeVideoAction } from './../actions/storeVideoAction';
import { videoHandlers } from './videoReducer';

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
});
