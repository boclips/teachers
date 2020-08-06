import { MockStoreFactory } from 'test-support/factories';
import { AgeRange } from 'src/types/AgeRange';
import { createMemoryHistory } from 'history';
import { Store } from 'redux';
import { createBoclipsStore } from 'src/app/redux/store';
import { renderWithCreatedStore } from 'test-support/renderWithStore';
import React from 'react';
import { AuthenticatedAgeRangeTag } from 'src/components/common/tags/AuthenticatedAgeRangeTag';

describe('Authenticated age range tag', () => {
  const history = createMemoryHistory({
    initialEntries: ['/collections/new-collection?referer=test-id'],
  });
  const ageRange = new AgeRange(5, 7);

  it('does not render the age tag when in student view', async () => {
    const store: Store = createBoclipsStore(
      MockStoreFactory.sampleState({
        router: { location: { search: '?referer=test-id' } } as any,
        authentication: {
          status: 'anonymous',
          shareCode: 't3sg',
          refererId: '6db85097-6664-46f4-b126-f014f6badf1d',
        },
      }),
      history,
    );

    const wrapper = renderWithCreatedStore(
      <AuthenticatedAgeRangeTag ageRange={ageRange} />,
      store,
      history,
    );

    expect(await wrapper.queryByText('Ages:')).not.toBeInTheDocument();
  });

  it('does render the age tag when logged in', async () => {
    const store: Store = createBoclipsStore(
      MockStoreFactory.sampleState({
        router: { location: { search: '?referer=test-id' } } as any,
        authentication: {
          status: 'authenticated',
        },
      }),
      history,
    );

    const wrapper = renderWithCreatedStore(
      <AuthenticatedAgeRangeTag ageRange={ageRange} />,
      store,
      history,
    );

    expect(await wrapper.queryByText('Ages:')).toBeInTheDocument();
  });
});
