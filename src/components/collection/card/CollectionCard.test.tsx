import React from 'react';
import { createBoclipsStore } from 'src/app/redux/store';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import {
  MockStoreFactory,
  VideoCollectionFactory,
  VideoFactory,
} from 'test-support/factories';
import { AgeRange } from '@bit/boclips.types.age-range';
import { CollectionCard } from './CollectionCard';

describe('CollectionCard', () => {
  it('displays the tags container when the given collection has tags', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      title: 'My collection',
      ageRange: new AgeRange(7, 11),
    });
    const videos = [VideoFactory.sample()];
    const store = createBoclipsStore(MockStoreFactory.sampleState());
    const component = renderWithBoclipsStore(
      <CollectionCard collection={collection} videos={videos} grid={false} />,
      store,
    );
    const tagsContainer = component.getByTestId('tags-container');

    expect(tagsContainer).toBeInTheDocument();
  });

  it('displays the tags container when grid is true', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      title: 'My collection',
    });
    const videos = [VideoFactory.sample()];
    const store = createBoclipsStore(MockStoreFactory.sampleState());
    const component = renderWithBoclipsStore(
      <CollectionCard collection={collection} videos={videos} grid={true} />,
      store,
    );
    const tagsContainer = component.getByTestId('tags-container');

    expect(tagsContainer).toBeInTheDocument();
  });

  it('does not display the tags container when the given collection has no tags and grid is false', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      title: 'My collection',
    });
    const videos = [VideoFactory.sample()];
    const store = createBoclipsStore(MockStoreFactory.sampleState());
    const component = renderWithBoclipsStore(
      <CollectionCard collection={collection} videos={videos} grid={false} />,
      store,
    );
    const tagsContainer = component.queryByTestId('tags-container');

    expect(tagsContainer).not.toBeInTheDocument();
  });

  describe('displaying video titles when there is no description', () => {
    it('with tags and no extra videos', () => {
      const collection = VideoCollectionFactory.sample({
        id: 'collection-id',
        title: 'My collection',
        ageRange: new AgeRange(5, 7),
        description: null,
      });
      const videos = [
        VideoFactory.sample({
          id: '1',
          title: 'Video 1',
          createdBy: 'Person 1',
        }),
        VideoFactory.sample({
          id: '2',
          title: 'Video 2',
          createdBy: 'Person 2',
        }),
      ];

      const store = createBoclipsStore(MockStoreFactory.sampleState());
      const component = renderWithBoclipsStore(
        <CollectionCard collection={collection} videos={videos} grid={false} />,
        store,
      );

      expect(component.getByText('"Video 1" by Person 1')).toBeVisible();
      expect(component.getByText('"Video 2" by Person 2')).toBeVisible();
    });
  });
});
