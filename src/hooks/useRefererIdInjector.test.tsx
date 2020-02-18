import { createMemoryHistory } from 'history';
import React from 'react';
import eventually from 'test-support/eventually';
import { createBoclipsStore } from 'src/app/redux/store';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { renderWithCreatedStore } from 'test-support/renderWithStore';
import State from 'src/types/State';
import { useRefererIdInjector } from './useRefererIdInjector';

describe(`withRefererId`, () => {
  const render = (initialHistory, initialState) => {
    const DivWithRefererId = () => {
      useRefererIdInjector();
      return <div>text</div>;
    };
    const history = createMemoryHistory({
      initialEntries: initialHistory,
    });

    const store = createBoclipsStore(
      {
        ...MockStoreFactory.sampleState({
          links: LinksStateValueFactory.sample(
            {},
            'https://api.example.com/v1',
          ),
        }),
        ...initialState,
      },
      history,
    );

    return renderWithCreatedStore(<DivWithRefererId />, store, history);
  };

  describe(`when authenticated`, () => {
    const authenticatedState = {
      authenticated: { status: 'authenticated' },
      user: UserProfileFactory.sample({ id: 'user-test-id' }),
    };
    it('sets the "referer" query param', async () => {
      const { findByText, history } = render(
        ['/videos/123'],
        authenticatedState,
      );

      await findByText('text');

      await eventually(() => {
        expect(history.location.search).toContain(
          `referer=${authenticatedState.user.id}`,
        );
      });
    });

    it('sets overwrites the "referer" query param if it is already set', async () => {
      const { findByText, history } = render(
        ['/videos/123?referer=user-id-1'],
        authenticatedState,
      );

      await findByText('text');

      await eventually(() => {
        expect(history.location.search).toContain(
          `referer=${authenticatedState.user.id}`,
        );
      });
    });
  });
  describe(`when unauthenticated`, () => {
    const unauthenticatedState: Partial<State> = {
      authentication: {
        status: 'anonymous',
      },
      user: null,
    };

    it('does not update the "referer" query param if it is set', async () => {
      const { findByText, history } = render(
        ['/videos/123?referer=user-id-1'],
        unauthenticatedState,
      );

      await findByText('text');

      await eventually(() => {
        expect(history.location.search).toContain('referer=user-id-1');
      });
    });

    it('adds an anonymous "referer" query param if it was missing', async () => {
      const { findByText, history } = render(
        ['/videos/123'],
        unauthenticatedState,
      );

      await findByText('text');

      await eventually(() => {
        expect(history.location.search).toContain('referer=anonymous');
      });
    });
  });
});
