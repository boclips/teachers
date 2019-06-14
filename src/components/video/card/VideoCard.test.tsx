import { Card } from 'antd';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {
  MockStoreFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import VideoButtons from '../buttons/videoButtons/VideoButtons';
import { Props, VideoCardForRouter } from './VideoCard';

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
  test('renders video buttons', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(VideoButtons)).toExist();
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
      const buttonsRow = wrapper
        .find('.buttons-row')
        .first()
        .childAt(0)
        .first()
        .childAt(0)
        .first();
      buttonsRow.simulate('click');
      expect(push.mock.calls).toHaveLength(0);
    });
  });
});

const getMountedWrapper = (givenProps: Partial<Props> = {}) => {
  const props: Props = {
    video: VideoFactory.sample(),
    history: null,
    location: null,
    match: null,
    ...givenProps,
  };

  return mount(
    <Provider store={MockStoreFactory.sample()}>
      <MemoryRouter>
        <VideoCardForRouter {...props} />
      </MemoryRouter>
    </Provider>,
  );
};
