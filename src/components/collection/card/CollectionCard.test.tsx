import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { noOp } from '../../../utils';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import CollectionHeader from '../header/CollectionHeader';
import { CollectionCardForRouter, Props } from './CollectionCard';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

const NUMBER_OF_PREVIEWS = 4;

describe('CollectionCard', () => {
  let collection: VideoCollection;

  const getWrapper = (extraProps: Partial<Props> = {}) => {
    const props = {
      collection,
      history: {
        push: noOp,
      } as any,
      numberOfPreviews: NUMBER_OF_PREVIEWS,
      navigateToCollectionDetails: jest.fn,
      ...extraProps,
    } as any;
    return shallow(<CollectionCardForRouter {...props} />);
  };

  beforeEach(() => {
    collection = VideoCollectionFactory.sample({
      id: '1-2-3',
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
  });

  it('renders collection header', () => {
    expect(
      getWrapper()
        .find(CollectionHeader)
        .props().collection,
    ).toEqual(collection);
  });

  it('renders collection video previews', () => {
    expect(getWrapper().find(CollectionCardVideoPreviews)).toExist();
  });

  it('navigates to the collection when the card is clicked', () => {
    const collectionCard = getWrapper();

    const clickableCard = collectionCard.find(ClickableCard);
    expect(clickableCard).toExist();
    expect(clickableCard.props().href).toEqual('/collections/1-2-3');
  });
});
