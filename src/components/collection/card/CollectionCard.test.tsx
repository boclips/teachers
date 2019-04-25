import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { By } from '../../../../test-support/By';
import {
  MockStoreFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCard } from './CollectionCard';
import CollectionCardHeader from './CollectionCardHeader';

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
      />,
    );
  });

  test('renders collection header', () => {
    expect(wrapper.find(CollectionCardHeader).props().collection).toEqual(
      collection,
    );
  });

  test('renders video previews', () => {
    expect(wrapper.find(By.dataQa('collection-video-preview'))).toHaveLength(2);
  });

  test('does not have class clickable without an onClick', () => {
    expect(wrapper.find('.clickable')).toHaveLength(0);
  });

  describe('a collection card with an onclick function', () => {
    const getWrapper = (onClick: React.MouseEventHandler) => {
      return mount(
        <Provider store={MockStoreFactory.sample()}>
          <MemoryRouter>
            <CollectionCard
              collection={collection}
              numberOfPreviews={NUMBER_OF_PREVIEWS}
              onClick={onClick}
            />
          </MemoryRouter>
        </Provider>,
      );
    };

    test('has class clickable when an onclick function is provided', () => {
      wrapper = getWrapper(() => {});
      expect(wrapper.find('.clickable')).toHaveLength(1);
    });

    test('When clicking on a video preview the onClick prop is not called', () => {
      const spy = jest.fn(() => {});

      wrapper = getWrapper(spy);

      const collectionVideoPreview = wrapper
        .find('.collection-video-preview')
        .first();

      collectionVideoPreview.simulate('click');

      expect(spy.mock.calls).toHaveLength(0);
    });

    test('When clicking the delete button the onClick prop is not called', () => {
      const spy = jest.fn(() => {});

      wrapper = getWrapper(spy);

      const deleteButton = wrapper.find(By.dataQa('delete-collection')).first();

      deleteButton.simulate('click');

      expect(spy.mock.calls).toHaveLength(0);
    });
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
