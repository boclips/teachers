import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { render } from '@testing-library/react';
import { VideoCollectionFactory } from '../../../../test-support/factories';
import { CollectionTitle } from './CollectionTitle';

const renderCollectionTitle = (collection) =>
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
