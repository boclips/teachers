import { Card } from 'antd';
import { RouterActionType } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import {
  LinksFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import {
  CollectionState,
  LinksState,
  RouterState,
  SearchState,
} from '../../../types/State';
import { Props, VideoCardForRouter } from './VideoCard';
import ManageVideoCollectionsButton from './videoCollectionButton/ManageVideoCollectionButton';
import RemoveFromVideoCollectionButton from './videoCollectionButton/RemoveFromVideoCollectionButton';

const getWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video: VideoFactory.sample(),
    history: null,
    location: null,
    match: null,
    ...givenProps,
  };
  return shallow(<VideoCardForRouter {...props} />);
};

describe('when outside video collection', () => {
  test('renders save button when card has no collection', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
  });

  test('it does not render subject tags container if there are none on the video', () => {
    const video = VideoFactory.sample({ subjects: [] });
    const wrapper = getWrapper({ video });

    expect(wrapper.find('.subjects-container')).toHaveLength(0);
  });

  test('renders subject tags container if there are none on the video', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.subjects-container')).toHaveLength(1);
  });

  describe('navigating to the video details page', () => {
    const push = jest.fn(() => true);
    const fakeHistory = { push };
    let wrapper;
    const video = VideoFactory.sample();

    beforeEach(() => {
      wrapper = getMountedWrapper({ history: fakeHistory as any });
    });

    afterEach(() => {
      push.mockReset();
    });

    const expectNavigationChanged = () => {
      expect(push.mock.calls).toHaveLength(1);
      expect(push.mock.calls[0][0]).toEqual(`/videos/${video.id}`);
    };

    it('happens when you click on the card', () => {
      const videoCard = wrapper.find(Card);
      videoCard.simulate('click');
      expectNavigationChanged();
    });

    it('does not happen when you click on the video controls', () => {
      const videoPreview = wrapper.find('.video-preview');
      videoPreview.simulate('click');
      expect(push.mock.calls).toHaveLength(0);
    });

    it('does not happen when you click on any button in the buttons row', () => {
      const buttonsRow = wrapper.find('.buttons-row').first();
      buttonsRow.simulate('click');
      expect(push.mock.calls).toHaveLength(0);
    });
  });
});

describe('when within video collection', () => {
  test('renders remove button when videos can be removed', () => {
    const video = VideoFactory.sample();
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        removeVideo: new Link({ href: '' }),
      }),
    });

    const wrapper = getWrapper({ video, currentCollection: collection });

    expect(wrapper.find(RemoveFromVideoCollectionButton)).toExist();
  });

  test('renders save button when videos cannot be removed', () => {
    const video = VideoFactory.sample();
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        removeVideo: undefined,
      }),
    });

    const wrapper = getWrapper({ video, currentCollection: collection });

    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
  });
});

const mockStore = configureStore<
  SearchState & LinksState & RouterState & CollectionState
>();

function createStore(query: string, isLoading = false) {
  return {
    links: LinksFactory.sample(),
    search: {
      videos: [],
      loading: isLoading,
      query,
      paging: {
        totalElements: 1111,
        totalPages: 0,
        number: 0,
        size: 10,
      },
    },
    router: {
      location: {
        pathname: '',
        search: `?q=${query}`,
        hash: '',
        state: null,
      },
      action: 'PUSH' as RouterActionType,
    },
    collections: {
      loading: false,
      updating: false,
      myCollections: [],
      publicCollections: {
        items: [],
        links: {},
      },
      bookmarkedCollections: {
        items: [],
        links: {},
      },
    },
  };
}

const getMountedWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video: VideoFactory.sample(),
    history: null,
    location: null,
    match: null,
    ...givenProps,
  };

  return mount(
    <Provider store={mockStore(createStore(''))}>
      <MemoryRouter>
        <VideoCardForRouter {...props} />
      </MemoryRouter>
    </Provider>,
  );
};
