import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {
  EntitiesFactory,
  LinksFactory,
  MockStoreFactory,
  VideoFactory,
} from '../../../test-support/factories';
import VerticalVideoList from '../../components/video/list/VerticalVideoList';
import { HomeViewVideoList } from './HomeViewVideoList';

it('calls fetch videos callback on mount', () => {
  const callback = jest.fn();
  mount(<HomeViewVideoList videoIds={[]} fetchPromotedVideos={callback} />);
  expect(callback).toHaveBeenCalled();
});

it('renders a video list with ids', () => {
  const callback = jest.fn();
  const promotedVideo = VideoFactory.sample({
    promoted: true,
  });
  const unpromotedVideo = VideoFactory.sample({
    promoted: false,
  });
  const store = MockStoreFactory.sample({
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
    links: LinksFactory.sample(),
  });
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <HomeViewVideoList
          fetchPromotedVideos={callback}
          videoIds={[promotedVideo.id]}
        />
      </MemoryRouter>
    </Provider>,
  );

  expect(wrapper.find(VerticalVideoList).props().videoIds).toEqual([
    promotedVideo.id,
  ]);
});
