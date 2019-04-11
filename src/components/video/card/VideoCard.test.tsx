import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoHeader } from '../header/VideoHeader';
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
      wrapper = getWrapper({ history: fakeHistory as any });
    });

    afterEach(() => {
      push.mockReset();
    });

    const expectNavigationChanged = () => {
      expect(push.mock.calls).toHaveLength(1);
      expect(push.mock.calls[0][0]).toEqual(`/videos/${video.id}`);
    };

    it('happens when you click on the header', () => {
      const title = wrapper.find(VideoHeader);
      title.simulate('click');
      expectNavigationChanged();
    });

    it('happens when you click the description', () => {
      const title = wrapper.find('.description');
      title.simulate('click');
      expectNavigationChanged();
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
