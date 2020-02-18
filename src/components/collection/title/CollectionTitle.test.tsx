import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { VideoCollectionFactory } from 'test-support/factories';
import { CollectionTitle } from './CollectionTitle';

const renderCollectionTitle = collection =>
  render(
    <Router history={createMemoryHistory()}>
      <CollectionTitle collection={collection} />
    </Router>,
  );

describe('displaying the title', () => {
  it('renders title', () => {
    const collectionTitle = renderCollectionTitle(
      VideoCollectionFactory.sample({ title: 'My collection' }),
    );
    expect(collectionTitle.getByText('My collection')).toBeInTheDocument();
  });
});

describe('Visibility icon', () => {
  it('show private icon when collection is not public and mine', () => {
    const collectionTitle = renderCollectionTitle(
      VideoCollectionFactory.sample({
        isPublic: false,
        isMine: true,
      }),
    );

    const icon = collectionTitle.queryByTestId('collection-visibility');
    expect(icon).toBeInTheDocument();
  });

  const noLogoCases = {
    publicAndMine: [true, true],
    publicAndNotMine: [true, false],
    privateAndNotMine: [false, false],
  };

  it.each([
    noLogoCases.publicAndMine,
    noLogoCases.publicAndNotMine,
    noLogoCases.privateAndNotMine,
  ])('does not show any visibility icon', (isPublic, isMine) => {
    const component = renderCollectionTitle(
      VideoCollectionFactory.sample({ isPublic, isMine }),
    );

    const icon = component.queryByTestId('collection-visibility');
    expect(icon).not.toBeInTheDocument();
  });
});
