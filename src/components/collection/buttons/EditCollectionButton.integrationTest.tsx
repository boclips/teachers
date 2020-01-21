import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import React from 'react';
import {
  SubjectsFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  CollectionsFactory,
  MockStoreFactory,
} from '../../../../test-support/factories';
import MockFetchVerify from '../../../../test-support/MockFetchVerify';
import { Link } from '../../../types/Link';
import { createBoclipsStore } from '../../../app/redux/store';
import {
  renderWithCreatedStore,
  renderWithStore,
} from '../../../../test-support/renderWithStore';
import { AgeRange } from '../../../types/AgeRange';
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

  it('has the values of the collection in the form', async () => {
    const collection = VideoCollectionFactory.sample({
      title: 'My test collection',
      description: 'Test description',
      subjects: ['maths', 'arts'],
      ageRange: new AgeRange(5, 14),
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/collections/123' }),
      }),
    });

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

    await component.findByText('Edit collection');

    expect(component.getByDisplayValue('My test collection')).toBeVisible();
    expect(component.getByText('Test description')).toBeVisible();
    expect(component.getByText('maths')).toBeVisible();
    expect(component.getByText('arts')).toBeVisible();

    const [minSlider, maxSlider] = component.getAllByRole('slider');

    expect(minSlider.getAttribute('aria-valuenow')).toEqual('5');
    expect(maxSlider.getAttribute('aria-valuenow')).toEqual('14');
  });

  it('updates the collection when the form is submitted', async () => {
    const collection = VideoCollectionFactory.sample({
      id: '123',
      title: 'Old Title',
      description: 'Old Description',
      links: VideoCollectionLinksFactory.sample({
        edit: new Link({ href: '/collections/123' }),
      }),
    });

    MockFetchVerify.patch('/collections/123', undefined, 204);

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

    await component.findByText('Edit collection');

    fireEvent.change(component.getByDisplayValue('Old Title'), {
      target: {
        value: 'New Title',
      },
    });
    fireEvent.change(component.getByText('Old Description'), {
      target: {
        value: 'New Description',
      },
    });

    await fireEvent.click(component.getByText('Save'));

    await waitForElementToBeRemoved(() =>
      component.getByText('Edit collection'),
    );

    await fireEvent.click(editButton);
    await component.findByText('Edit collection');

    /**
     * Ideally we'd be checking the form has updated, but the form receives the
     * collection as props, which the parent then eventually updates once the
     * state has changed..
     */
    const updatedCollection = component.store.getState().entities.collections
      .byId['123'];
    expect(updatedCollection.title).toEqual('New Title');
    expect(updatedCollection.description).toEqual('New Description');
  });
});
