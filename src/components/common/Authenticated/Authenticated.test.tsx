import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { MockStoreFactory } from 'test-support/factories';
import { Authenticated } from 'src/components/common/Authenticated/Authenticated';
import React from 'react';

describe('Authenticated', () => {
  it('renders children when the user is authenticated', () => {
    const wrapper = renderWithBoclipsStore(
      <Authenticated>
        <div>Foo</div>
      </Authenticated>,
      MockStoreFactory.sampleState({
        authentication: {
          status: 'anonymous',
        },
      }),
    );

    expect(wrapper.queryByText('Foo')).not.toBeInTheDocument();
  });
  it('does not renders children when the user is authenticated', () => {
    const wrapper = renderWithBoclipsStore(
      <Authenticated>
        <div>Foo</div>
      </Authenticated>,
      MockStoreFactory.sampleState({
        authentication: {
          status: 'authenticated',
        },
      }),
    );

    expect(wrapper.queryByText('Foo')).toBeInTheDocument();
  });
});
