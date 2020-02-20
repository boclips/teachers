import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { By } from '../../../test-support/By';
import {
  EntitiesFactory,
  LinksStateValueFactory,
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
    links: LinksStateValueFactory.sample(),
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

it('does not render if there are no promoted videos', () => {
  const callback = jest.fn();
  const unpromotedVideo = VideoFactory.sample({
    promoted: false,
  });
  const store = MockStoreFactory.sample({
    entities: EntitiesFactory.sample({
      videos: {
        byId: {
          [unpromotedVideo.id]: unpromotedVideo,
        },
      },
    }),
    videos: {
      promotedVideoIds: [],
    },
    links: LinksStateValueFactory.sample(),
  });
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <HomeViewVideoList fetchPromotedVideos={callback} videoIds={[]} />
      </MemoryRouter>
    </Provider>,
  );

  expect(wrapper.find(By.dataQa('home-view-videos'))).not.toExist();
});
