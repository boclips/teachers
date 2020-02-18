import { Radio } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStoreFactory, VideoFactory } from 'test-support/factories';
import { Link } from 'src/types/Link';
import { Video } from 'src/types/Video';
import { noOp } from 'src/utils';
import TagVideo from './TagVideo';

function mountTagVideo(video: Video) {
  return mount(
    <Provider store={MockStoreFactory.sample({})}>
      <TagVideo video={video} onChange={noOp} selectedTag={null} />
    </Provider>,
  );
}

describe('when video has tag link', () => {
  test('it renders a available tags', () => {
    const tagVideo = mountTagVideo(
      VideoFactory.sample({
        links: { self: new Link({ href: '' }), tag: new Link({ href: '' }) },
      }),
    );
    expect(tagVideo.find(Radio).length).toEqual(2);
  });
});

describe('when video has no tag link', () => {
  test('it does not render any tags', () => {
    const tagVideo = mountTagVideo(
      VideoFactory.sample({
        links: { self: new Link({ href: '' }), tag: null },
      }),
    );
    expect(tagVideo.find(Radio)).not.toExist();
  });
});
