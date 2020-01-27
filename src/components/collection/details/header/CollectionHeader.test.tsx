import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import {
  AttachmentFactory,
  CollectionsFactory,
  SubjectFactory,
  VideoCollectionFactory,
  VideoIdFactory,
} from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { renderWithStore } from '../../../../../test-support/renderWithStore';
import { AgeRange } from '../../../../types/AgeRange';
import { CollectionHeader } from './CollectionHeader';

describe('CollectionHeader', () => {
  it('renders the title', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      title: 'My collection',
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );

    expect(component.getByText('My collection')).toBeInTheDocument();
  });

  it('renders the bookmark button', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      links: {
        self: new Link({ href: '' }),
        bookmark: new Link({ href: '' }),
      },
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    expect(component.getByTestId('bookmark-collection')).toBeInTheDocument();
  });

  it('renders the collection buttons', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      links: {
        self: new Link({ href: '' }),
        edit: new Link({ href: '' }),
        remove: new Link({ href: '' }),
      },
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
      {
        initialState: {
          collections: CollectionsFactory.sample(),
        },
      },
    );
    expect(component.getByTestId('collection-edit-button')).toBeInTheDocument();
    expect(
      component.queryByTestId('delete-collection'),
    ).not.toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      videoIds: [VideoIdFactory.sample()],
      updatedAt: '2018-12-12T12:12:12',
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    expect(component.getByTestId('collection-number-of-videos')).toContainHTML(
      '1',
    );
    expect(component.getByTestId('collection-updated-at')).toContainHTML(
      '<span>Dec 12, 2018</span>',
    );
  });

  it('renders tags when present', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      subjects: ['subject-id'],
      ageRange: new AgeRange(5, 7),
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
      {
        initialState: {
          subjects: [
            SubjectFactory.sample({ id: 'subject-id', name: 'Maths' }),
          ],
        },
      },
    );
    expect(component.getByText('Maths')).toBeInTheDocument();
    expect(component.getByText('5-7')).toBeInTheDocument();
  });

  it('renders no tags container when no tags are present', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    expect(component.queryByTestId('tags-container')).not.toBeInTheDocument();
  });

  it('renders the description', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      description: 'My description',
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    expect(component.getByText('My description')).toBeInTheDocument();
  });

  it('renders a lesson plan when present and restricts the description', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      description: 'My description',
      attachments: [
        AttachmentFactory.sample({
          description: '1. Point one of my lesson plan',
        }),
      ],
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    const descriptionRow = component.getByTestId('collection-description-row');
    const descriptionColumn = descriptionRow.children.item(0);

    expect(descriptionColumn.className).toBe(
      'ant-col ant-col-sm-24 ant-col-md-12 ant-col-lg-16',
    );
    expect(component.getByText('Lesson plan outline')).toBeInTheDocument();
    expect(
      component.getByText('Point one of my lesson plan'),
    ).toBeInTheDocument();
  });

  it('does not restrict the description when no lesson plan is present', () => {
    const collection = VideoCollectionFactory.sample({
      id: 'collection-id',
      description: 'My description',
    });
    const component = renderWithStore(
      <Router history={createMemoryHistory()}>
        <CollectionHeader collection={collection} />
      </Router>,
    );
    const descriptionRow = component.getByTestId('collection-description-row');
    const descriptionColumn = descriptionRow.children.item(0);

    expect(descriptionColumn.className).toBe('ant-col');
  });
});
