import { Rate } from 'antd';
import Mock = jest.Mock;
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from 'test-support/By';
import eventually from 'test-support/eventually';
import {
  MockStoreFactory,
  TagFactory,
  TagsFactory,
  VideoFactory,
} from 'test-support/factories';
import tagVideo from 'src/services/tags/tagVideo';
import { Link } from 'src/types/Link';
import { Video } from 'src/types/Video';
import { noOp } from 'src/utils';
import VideoFeedbackModal from './VideoFeedbackModal';
import TagVideo from './TagVideo';

jest.mock('../../../services/tags/tagVideo');
const tagVideoMock = tagVideo as Mock;
tagVideoMock.mockReturnValue(Promise.resolve(VideoFactory.sample()));

const onSaved = jest.fn();
const taggableRateableVideo = VideoFactory.sample({
  links: {
    self: new Link({ href: '' }),
    tag: new Link({ href: '' }),
    rate: new Link({ href: '' }),
  },
});
const tag = TagFactory.sample();
function mountTagVideo(video: Video) {
  return mount(
    <Provider
      store={MockStoreFactory.sample({
        tags: TagsFactory.sample([tag]),
      })}
    >
      <VideoFeedbackModal
        visible={true}
        video={video}
        onSaved={onSaved}
        onModalCancelled={noOp}
      />
    </Provider>,
  );
}

describe('rendering', () => {
  test('it renders rating and tags', () => {
    const component = mountTagVideo(taggableRateableVideo);
    expect(component.find(Rate)).toExist();
    expect(component.find(TagVideo)).toExist();
  });
});

describe('tagging', () => {
  test('it tags video when tag selected and saved', async () => {
    const wrapper = mountTagVideo(taggableRateableVideo);
    wrapper
      .find(By.dataQa('tag-radio'))
      .first()
      .simulate('click');
    wrapper.find(By.dataQa('rate-button', 'Button')).simulate('click');

    await eventually(() => {
      expect(onSaved).toHaveBeenCalled();
      expect(tagVideoMock).toHaveBeenCalledWith(taggableRateableVideo, tag);
    });
  });

  test('it doesnt tag video when no tag selected', async () => {
    const wrapper = mountTagVideo(taggableRateableVideo);
    wrapper.find(By.dataQa('rate-button', 'Button')).simulate('click');

    await eventually(() => {
      expect(onSaved).toHaveBeenCalled();
      expect(tagVideoMock).not.toHaveBeenCalled();
    });
  });
});
