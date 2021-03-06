import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import ManageVideoCollectionsButton from './ManageVideoCollectionButton';
import RemoveFromVideoCollectionButton from './RemoveFromVideoCollectionButton';
import VideoCollectionButton from './VideoCollectionButton';

const getWrapper = (
  givenProps: Partial<{
    video: Video | null;
    collection?: VideoCollection;
  }> = {},
) => {
  const props: {
    video: Video | null;
    collection?: VideoCollection;
  } = {
    video: VideoFactory.sample(),
    ...givenProps,
  };
  // eslint-disable-next-line react/jsx-props-no-spreading
  return shallow(<VideoCollectionButton {...props} />);
};

describe('when outside video collection', () => {
  test('renders save button when card has no collection', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
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

    const wrapper = getWrapper({ video, collection });

    expect(wrapper.find(RemoveFromVideoCollectionButton)).toExist();
  });

  test('renders save button when videos cannot be removed', () => {
    const video = VideoFactory.sample();
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        removeVideo: undefined,
      }),
    });

    const wrapper = getWrapper({ video, collection });

    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
  });
});
