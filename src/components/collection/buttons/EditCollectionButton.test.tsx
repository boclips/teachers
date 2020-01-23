import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  SubjectsFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  CollectionsFactory,
  MockStoreFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { createBoclipsStore } from '../../../app/redux/store';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../../test-support/renderWithStore';
import { EditCollectionButton } from './EditCollectionButton';

describe('EditCollectionButton', () => {
  const getUneditableCollection = () =>
    VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({ edit: undefined }),
    });

  const getEditableCollection = () =>
    VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/collections/123' }),
      }),
    });

  it('does not render, when the collection is not yours', () => {
    const collection = getUneditableCollection();

    const component = render(<EditCollectionButton collection={collection} />);

    expect(component.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('does render when the collection is editable', () => {
    const collection = getEditableCollection();

    const component = renderWithStore(
      <EditCollectionButton collection={collection} />,
      {
        initialState: {
          collections: CollectionsFactory.sample({
            loading: false,
            updating: false,
          }),
        },
      },
    );

    const editButton = component.getByText('Edit').closest('button');

    expect(editButton).toBeInTheDocument();
    expect(editButton.disabled).toBeFalsy();
  });

  it('is disabled, when collections are loading', () => {
    const collection = getEditableCollection();

    const component = renderWithStore(
      <EditCollectionButton collection={collection} />,
      {
        initialState: {
          collections: CollectionsFactory.sample({
            loading: true,
            updating: false,
          }),
        },
      },
    );

    const editButton = component.getByText('Edit').closest('button');

    expect(editButton.disabled).toBeTruthy();
  });
  it('is disabled, when collections are updating', () => {
    const collection = getEditableCollection();

    const component = renderWithStore(
      <EditCollectionButton collection={collection} />,
      {
        initialState: {
          collections: CollectionsFactory.sample({
            loading: false,
            updating: true,
          }),
        },
      },
    );

    const editButton = component.getByText('Edit').closest('button');

    expect(editButton.disabled).toBeTruthy();
  });

  it('opens the form when the button is clicked', async () => {
    const collection = getEditableCollection();

    const store = createBoclipsStore(
      MockStoreFactory.sampleState({
        subjects: SubjectsFactory.sample(),
      }),
    );

    const component = renderWithCreatedStore(
      <EditCollectionButton collection={collection} />,
      store,
    );

    const editButton = component.getByText('Edit').closest('button');

    fireEvent.click(editButton);

    const modalTitle = await component.findByText('Edit collection');

    expect(modalTitle).toBeVisible();
  });
});
