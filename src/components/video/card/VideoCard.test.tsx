import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import VideoCard from './VideoCard';
import ManageVideoCollectionsButton from './videoCollectionButton/ManageVideoCollectionButton';
import RemoveFromVideoCollectionButton from './videoCollectionButton/RemoveFromVideoCollectionButton';

describe('when outside video collection', () => {
  test('renders save button when card has no collection', () => {
    const video = VideoFactory.sample();
    const wrapper = shallow(<VideoCard video={video} />);

    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
  });

  test('it does not render subject tags container if there are none on the video', () => {
    const video = VideoFactory.sample({ subjects: [] });
    const wrapper = shallow(<VideoCard video={video} />);

    expect(wrapper.find('.subjects-container')).toHaveLength(0);
  });

  test('renders subject tags container if there are none on the video', () => {
    const video = VideoFactory.sample();
    const wrapper = shallow(<VideoCard video={video} />);

    expect(wrapper.find('.subjects-container')).toHaveLength(1);
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
    const wrapper = shallow(
      <VideoCard video={video} currentCollection={collection} />,
    );

    expect(wrapper.find(RemoveFromVideoCollectionButton)).toExist();
  });

  test('renders save button when videos cannot be removed', () => {
    const video = VideoFactory.sample();
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        removeVideo: undefined,
      }),
    });

    const wrapper = shallow(
      <VideoCard video={video} currentCollection={collection} />,
    );

    expect(wrapper.find(ManageVideoCollectionsButton)).toExist();
  });
});
