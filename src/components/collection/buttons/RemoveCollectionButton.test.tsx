import React from 'react';
import {
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import {
  CollectionsFactory,
  MockStoreFactory,
  SubjectsFactory,
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import {
  renderWithStore,
  renderWithCreatedStore,
} from '../../../../test-support/renderWithStore';
import { createBoclipsStore } from '../../../app/redux/store';
import eventually from '../../../../test-support/eventually';
import MockFetchVerify from '../../../../test-support/MockFetchVerify';
import { RemoveCollectionButton } from './RemoveCollectionButton';

describe('RemoveCollectionButton', () => {
  it('does not render if the collection cannot be removed', () => {
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({ remove: undefined }),
    });

    const context = renderWithStore(
      <RemoveCollectionButton collection={collection} />,
    );

    expect(context.queryByText('Delete')).not.toBeInTheDocument();
  });
  it('does render if the collection can be removed', () => {
    const collection = VideoCollectionFactory.sample({
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: '/collections/123' }),
      }),
    });

    const context = renderWithStore(
      <RemoveCollectionButton collection={collection} />,
    );

    expect(context.queryByText('Delete Collection')).toBeInTheDocument();
  });
  it('asks for confirmation when clicked', async () => {
    const collection = VideoCollectionFactory.sample({
      title: 'first',
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: '/collections/123' }),
      }),
    });

    const store = createBoclipsStore(
      MockStoreFactory.sampleState({
        subjects: SubjectsFactory.sample(),
        collections: CollectionsFactory.sample({
          myCollections: { items: [collection.id], links: {} },
        }),
      }),
    );

    const context = renderWithCreatedStore(
      <RemoveCollectionButton collection={collection} />,
      store,
    );

    const button = context.getByText('Delete Collection');

    fireEvent.click(button);

    expect(await context.findByText(/Are you sure.*/)).toBeInTheDocument();
  });

  it('removes the collection from my collections when confirmed', async () => {
    const collection = VideoCollectionFactory.sample({
      id: '123',
      title: 'second',
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: '/collections/123' }),
      }),
    });

    const store = createBoclipsStore(
      MockStoreFactory.sampleState({
        subjects: SubjectsFactory.sample(),
        collections: CollectionsFactory.sample({
          myCollections: { items: [collection.id], links: {} },
        }),
      }),
    );

    MockFetchVerify.delete('/collections/123', undefined, 204);

    const context = renderWithCreatedStore(
      <RemoveCollectionButton collection={collection} />,
      store,
    );

    const button = context.getByText('Delete Collection');

    fireEvent.click(button);

    expect(await context.findByText(/Are you sure.*/)).toBeInTheDocument();

    const dialog = await context.findByRole('dialog');

    const confirmationButton = within(dialog).getByText('Delete');
    expect(confirmationButton).toBeInTheDocument();

    fireEvent.click(confirmationButton);

    await waitForElementToBeRemoved(() => context.getByText(/Are you sure.*/));

    expect(
      await context.findByText(/.*has been deleted.*/),
    ).toBeInTheDocument();

    await eventually(() => {
      expect(
        context.store.getState().collections.myCollections.items,
      ).toHaveLength(0);
    });
  });
});
