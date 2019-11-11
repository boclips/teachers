import { shallow } from 'enzyme';
import React from 'react';
import {
  CollectionsFactory,
  EntitiesFactory,
  RouterFactory,
  SubjectFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
import { render } from '../../../../test-support/render';
import { AgeRange } from '../../../types/AgeRange';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { noOp } from '../../../utils';
import { ClickableCard } from '../../common/ClickableCard/ClickableCard';
import CollectionHeader from '../header/CollectionHeader';
import { CollectionCard, Props } from './CollectionCard';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
import { within } from '@testing-library/react';

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
    return shallow(<CollectionCard {...props} />);
  };

  beforeEach(() => {
    const firstVideo = VideoFactory.sample({ id: '1' });
    const secondVideo = VideoFactory.sample({ id: '2' });

    collection = VideoCollectionFactory.sample({
      id: '1-2-3',
      title: 'a collection',
      updatedAt: '2018-12-25T12:00:00.870Z',
      videoIds: [firstVideo, secondVideo].map(it =>
        VideoIdFactory.sample({ value: it.id }),
      ),
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

describe('CollectionCard using testing-library', () => {
  it('renders basic information and video previews when loaded', () => {
    const firstVideo = VideoFactory.sample({ id: '1' });
    const secondVideo = VideoFactory.sample({ id: '2' });
    const subject = SubjectFactory.sample({ id: 'subject-id', name: 'Maths' });
    const collection = VideoCollectionFactory.sample({
      id: '1-2-3',
      title: 'My best collection',
      updatedAt: '2019-11-11T12:00:00.870Z',
      videoIds: [firstVideo, secondVideo].map(it =>
        VideoIdFactory.sample({ value: it.id }),
      ),
      subjects: [subject.id],
      ageRange: new AgeRange(4, 12),
      links: VideoCollectionLinksFactory.sample({
        bookmark: new Link({ href: 'bookmark', templated: false }),
        unbookmark: new Link({ href: 'unbookmark', templated: false }),
      }),
    });

    const { getByText, getByTestId } = render(
      <CollectionCard
        collection={collection}
        numberOfPreviews={4}
        videos={[firstVideo, secondVideo]}
      />,
      {
        initialState: {
          router: RouterFactory.sample(),
          entities: EntitiesFactory.sample({
            collections: {
              byId: {
                [collection.id]: collection,
              },
            },
          }),
          collections: CollectionsFactory.sample(),
          subjects: [subject],
        },
      },
    );

    const collectionCard = getByTestId('collection-card');

    expect(getByText('My best collection')).toBeInTheDocument();
    expect(getByText('Subject:')).toBeInTheDocument();
    expect(getByText('Maths')).toBeInTheDocument();
    expect(getByText('Ages:')).toBeInTheDocument();
    expect(getByText('4-12')).toBeInTheDocument();
    expect(within(collectionCard).getByRole('button')).toBeInTheDocument();
  });

  // 1. basic look
  // renders title, subtitle
  // renders actions
  // renders video previews
  // shows visibility (public or private)
  // clicking on it redirects to collection page
  // ---
  // 2. edit click
  // opens editor dialog
  // changing title, submit => change reflected in card
  // --
  // 3. delete click
  // opens warning dialog
  // delete confirmation -> card is removed from dom
  // --
  // 4. can click on the video and start it from the card view
  // --
});
