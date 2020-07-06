import * as React from 'react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  EntitiesFactory,
  MockStoreFactory,
  UserProfileFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { HomeViewVideoList } from './HomeViewVideoList';

describe('HomeViewVideoList', () => {
  it('render promoted videos section if finds any promoted video', () => {
    const promotedVideo = VideoFactory.sample({
      id: 'abc123',
      promoted: true,
      title: 'This is promoted',
    });
    const unpromotedVideo = VideoFactory.sample({
      id: 'def345',
      promoted: false,
      title: 'This is not promoted',
    });
    const state = MockStoreFactory.sampleState({
      entities: EntitiesFactory.sample({
        videos: {
          byId: {
            [promotedVideo.id]: promotedVideo,
            [unpromotedVideo.id]: unpromotedVideo,
          },
        },
      }),
      videos: {
        promotedVideoIds: [promotedVideo.id],
      },
      user: UserProfileFactory.sample({ subjects: ['test-subject-id'] }),
    });

    const view = renderWithStore(<HomeViewVideoList />, {
      initialState: state,
    });

    expect(view.getByText('Videos for you')).toBeInTheDocument();
    expect(view.getByText('This is promoted')).toBeInTheDocument();
  });

  it('does not render if there are no promoted videos', () => {
    const view = renderWithStore(<HomeViewVideoList />, {
      initialState: {
        videos: {
          promotedVideoIds: [],
        },
        user: UserProfileFactory.sample({ subjects: ['test-subject-id'] }),
      },
    });

    expect(view.queryByText('Videos for you')).not.toBeInTheDocument();
  });
});
