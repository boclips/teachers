import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../test-support/By';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../test-support/factories';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import { CollectionSubtitle } from './CollectionSubtitle';

const NUMBER_OF_PREVIEWS = 4;

describe('CollectionCard', () => {
  let wrapper;
  let collection: VideoCollection;

  beforeEach(() => {
    collection = VideoCollectionFactory.sample({
      title: 'a collection',
      updatedAt: '2018-12-25T12:00:00.870Z',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '1' }),
        VideoFactory.sample({ id: '2' }),
      ]),
    });

    wrapper = shallow(
      <CollectionCard
        collection={collection}
        numberOfPreviews={NUMBER_OF_PREVIEWS}
      />,
    );
  });

  test('renders collection title', () => {
    expect(wrapper.find(By.dataQa('collection-title')).text()).toEqual(
      'a collection',
    );
  });

  test('renders collection subtitle', () => {
    expect(wrapper.find(CollectionSubtitle).prop('collection')).toEqual(
      collection,
    );
  });

  test('renders video previews', () => {
    expect(wrapper.find(By.dataQa('collection-video-preview'))).toHaveLength(2);
  });

  test('does not render a video preview counter', () => {
    expect(
      wrapper.find(By.dataQa('collection-video-preview-counter')),
    ).not.toExist();
  });

  describe('when more than 4 videos', () => {
    beforeEach(() => {
      collection = VideoCollectionFactory.sample({
        videos: VideoCollectionFactory.sampleVideos([
          VideoFactory.sample({ id: '1' }),
          VideoFactory.sample({ id: '2' }),
          VideoFactory.sample({ id: '3' }),
          VideoFactory.sample({ id: '4' }),
          VideoFactory.sample({ id: '5' }),
        ]),
      });
      wrapper = shallow(
        <CollectionCard
          collection={collection}
          numberOfPreviews={NUMBER_OF_PREVIEWS}
        />,
      );
    });

    test('renders 3 video previews', () => {
      expect(wrapper.find(By.dataQa('collection-video-preview'))).toHaveLength(
        3,
      );
    });

    test('renders 1 video preview counter', () => {
      expect(
        wrapper.find(By.dataQa('collection-video-preview-counter')).text(),
      ).toEqual('2');
    });
  });

  describe('when exactly 4 videos', () => {
    beforeEach(() => {
      collection = VideoCollectionFactory.sample({
        videos: VideoCollectionFactory.sampleVideos([
          VideoFactory.sample({ id: '1' }),
          VideoFactory.sample({ id: '2' }),
          VideoFactory.sample({ id: '3' }),
          VideoFactory.sample({ id: '4' }),
        ]),
      });
      wrapper = shallow(
        <CollectionCard
          collection={collection}
          numberOfPreviews={NUMBER_OF_PREVIEWS}
        />,
      );
    });

    test('renders 4 video previews', () => {
      expect(wrapper.find(By.dataQa('collection-video-preview'))).toHaveLength(
        4,
      );
    });

    test('does not render a video preview counter', () => {
      expect(
        wrapper.find(By.dataQa('collection-video-preview-counter')),
      ).not.toExist();
    });
  });
});
