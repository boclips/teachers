import { mount } from 'enzyme';
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
import { CollectionCard } from './CollectionCard';

describe('a collection card with an onclick function', () => {
  const getWrapper = (onClick: React.MouseEventHandler) => {
    const collection = VideoCollectionFactory.sample({
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

    return mount(
      <Provider store={MockStoreFactory.sample()}>
        <MemoryRouter>
          <CollectionCard
            collection={collection}
            numberOfPreviews={4}
            onClick={onClick}
          />
        </MemoryRouter>
      </Provider>,
    );
  };

  test('has class clickable when an onclick function is provided', () => {
    const wrapper = getWrapper(() => {});
    expect(wrapper.find('.clickable')).toHaveLength(1);
  });

  test('When clicking on a video preview the onClick prop is not called', () => {
    const spy = jest.fn(() => {});

    const wrapper = getWrapper(spy);

    const collectionVideoPreview = wrapper
      .find('.collection-video-preview')
      .first();

    collectionVideoPreview.simulate('click');

    expect(spy.mock.calls).toHaveLength(0);
  });

  test('When clicking the delete button the onClick prop is not called', () => {
    const spy = jest.fn(() => {});

    const wrapper = getWrapper(spy);

    const deleteButton = wrapper.find(By.dataQa('delete-collection')).first();

    deleteButton.simulate('click');

    expect(spy.mock.calls).toHaveLength(0);
  });
});
