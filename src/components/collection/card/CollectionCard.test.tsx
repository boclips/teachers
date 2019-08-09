import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import CollectionHeader from '../header/CollectionHeader';
import { CollectionCard } from './CollectionCard';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

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
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: 'it-exists', templated: false }),
      }),
    });

    wrapper = shallow(
      <CollectionCard
        collection={collection}
        numberOfPreviews={NUMBER_OF_PREVIEWS}
        onClick={jest.fn}
      />,
    );
  });

  test('renders collection header', () => {
    expect(wrapper.find(CollectionHeader).props().collection).toEqual(
      collection,
    );
  });

  test('does not have class clickable without an onClick', () => {
    expect(wrapper.find('.clickable')).toHaveLength(0);
  });

  test('renders collection video previews', () => {
    expect(wrapper.find(CollectionCardVideoPreviews)).toExist();
  });
});
