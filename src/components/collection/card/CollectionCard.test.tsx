import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import {
  VideoCollectionFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { AgeRange } from '../../../types/AgeRange';
import { CollectionCard } from './CollectionCard';

describe('CollectionCard', () => {
  it('displays the tags container when the given collection has tags', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      title: 'My collection',
      ageRange: new AgeRange(7, 11),
    });
    const videos = [VideoFactory.sample()];
    const component = render(
      <Router history={createMemoryHistory()}>
        <CollectionCard collection={collection} videos={videos} grid={false} />,
      </Router>,
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
    const component = render(
      <Router history={createMemoryHistory()}>
        <CollectionCard collection={collection} videos={videos} grid={true} />,
      </Router>,
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
    const component = render(
      <Router history={createMemoryHistory()}>
        <CollectionCard collection={collection} videos={videos} grid={false} />,
      </Router>,
    );
    const tagsContainer = component.queryByTestId('tags-container');

    expect(tagsContainer).not.toBeInTheDocument();
  });
});
