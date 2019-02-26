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

describe('CollectionCard', () => {
  let wrapper;
  let collection: VideoCollection;

  beforeEach(() => {
    collection = VideoCollectionFactory.sample({
      title: 'a collection',
      updatedAt: '2018-12-25T12:00:00.870Z',
      videos: [VideoFactory.sample(), VideoFactory.sample()],
    });
    wrapper = shallow(<CollectionCard collection={collection} />);
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
        videos: [
          VideoFactory.sample(),
          VideoFactory.sample(),
          VideoFactory.sample(),
          VideoFactory.sample(),
          VideoFactory.sample(),
        ],
      });
      wrapper = shallow(<CollectionCard collection={collection} />);
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
        videos: [
          VideoFactory.sample(),
          VideoFactory.sample(),
          VideoFactory.sample(),
          VideoFactory.sample(),
        ],
      });
      wrapper = shallow(<CollectionCard collection={collection} />);
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
