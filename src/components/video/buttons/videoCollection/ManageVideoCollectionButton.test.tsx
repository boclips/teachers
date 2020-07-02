import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import By from '../../../../../test-support/By';
import {
  EntitiesFactory,
  MockStoreFactory,
  PageableCollectionsFactory,
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../../test-support/factories';
import { Video } from '../../../../types/Video';
import { VideoCollection } from '../../../../types/VideoCollection';
import { createCollectionAction } from '../../../collection/redux/actions/createCollectionAction';
import SavingButton from '../../../common/savingButton/SavingButton';
import ManageVideoCollectionsButton from './ManageVideoCollectionButton';

let store: MockStore;

describe('when no public collection link', () => {
  test('renders nothing', () => {
    const wrapper = mountWith(null, null, true);

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    expect(wrapper.find(By.dataQa('loading-collections'))).toExist();
  });
});

describe('when loading collections', () => {
  test('renders loading thingy', () => {
    const wrapper = mountWith(null, null, true);

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    expect(wrapper.find(By.dataQa('loading-collections'))).toExist();
  });
});

describe('when existing collections', () => {
  test('renders checkboxes for empty collections', () => {
    const wrapper = mountWith([
      VideoCollectionFactory.sample({
        videoIds: [],
        id: 'asdfa',
      }),
      VideoCollectionFactory.sample({
        videoIds: [],
      }),
    ]);

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    expect(wrapper.find(By.dataQa('add-to-collection', 'input'))).toHaveLength(
      2,
    );
  });

  test('renders checked checkboxes for collections containing video', () => {
    const video = VideoFactory.sample();
    const wrapper = mountWith(
      [
        VideoCollectionFactory.sample({
          videoIds: [VideoIdFactory.sample({ value: video.id })],
          id: 'asdfa',
        }),
        VideoCollectionFactory.sample({
          videoIds: [],
        }),
      ],
      video,
    );

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    expect(wrapper.find(By.dataQa('add-to-collection', 'input'))).toHaveLength(
      1,
    );
    expect(
      wrapper.find(By.dataQa('remove-from-collection', 'input')),
    ).toHaveLength(1);
  });

  test('create new collection', () => {
    const video = VideoFactory.sample();
    const wrapper = mountWith([], video);

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    expect(
      wrapper.find(By.dataQa('new-collection-title', 'input')),
    ).toHaveLength(0);

    wrapper.find(By.dataQa('create-collection')).simulate('click');

    wrapper
      .find(By.dataQa('new-collection-title', 'input'))
      .simulate('change', { target: { value: 'a collection' } });

    wrapper
      .find(By.dataQa('create-collection-button', 'button'))
      .simulate('click');

    expect(store.getActions()).toContainEqual(
      createCollectionAction({ title: 'a collection', videos: [video] }),
    );
  });
});

describe('when updating collections', () => {
  test('doesnt show saving spinner by default', () => {
    const wrapper = mountWith(
      [VideoCollectionFactory.sample()],
      null,
      false,
      true,
    );

    expect(wrapper.find(SavingButton).first()).toHaveProp('saving', false);
    expect(wrapper.find(SavingButton).last()).toHaveProp('saving', false);
  });

  test('shows the spinner after saving/removing/creating', () => {
    const wrapper = mountWith(
      [VideoCollectionFactory.sample()],
      null,
      false,
      true,
    );

    wrapper
      .find(By.dataQa('video-collection-menu', 'button'))
      .first()
      .simulate('click');

    wrapper.find(By.dataQa('create-collection')).simulate('click');

    wrapper
      .find(By.dataQa('new-collection-title', 'input'))
      .simulate('change', { target: { value: 'a collection' } });

    wrapper
      .find(By.dataQa('create-collection-button', 'button'))
      .simulate('click');

    expect(wrapper.find(SavingButton).first()).toHaveProp('saving', true);
    expect(wrapper.find(SavingButton).last()).toHaveProp('saving', true);
  });
});

const mountWith = (
  collections: VideoCollection[] = [VideoCollectionFactory.sample()],
  video: Video = VideoFactory.sample(),
  loading: boolean = false,
  updating: boolean = false,
) => {
  const normalizedCollections =
    collections == null
      ? {}
      : collections.reduce((collectionsObject, value) => {
          collectionsObject[value.id] = value;
          return collectionsObject;
        }, {});

  store = MockStoreFactory.sample({
    entities: EntitiesFactory.sample({
      collections: { byId: normalizedCollections },
    }),
    collections: {
      myCollections: PageableCollectionsFactory.sample({
        items:
          collections == null
            ? []
            : collections.map((collection) => collection.id),
      }),
      discoverCollections: undefined,
      promotedCollections: undefined,
      loading,
      updating,
    },
  });
  return mount(
    <Provider store={store}>
      <ManageVideoCollectionsButton
        video={video}
        collectionKey="myCollections"
      />
    </Provider>,
  );
};
