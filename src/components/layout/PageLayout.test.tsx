import React from 'react';
import {
  renderWithStore,
  ResultingContext,
} from '../../../test-support/renderWithStore';
import { UserProfileFactory } from '../../../test-support/factories';
import PageLayout from './PageLayout';

describe('Header when authenticated', () => {
  let context: ResultingContext;

  beforeEach(() => {
    context = renderWithStore(
      <PageLayout showNavigation={true}>
        <div>Content</div>
      </PageLayout>,
      {
        initialState: {
          user: UserProfileFactory.sample(),
        },
      },
    );
  });

  it('Renders a desktop and mobile Your Account button', () => {
    const buttons = context.getAllByText('Your account');

    expect(buttons).toHaveLength(4);
  });

  it('Renders a desktop and mobile Subjects button', () => {
    const buttons = context.getAllByText('Subjects');

    expect(buttons).toHaveLength(4);
  });

  it('Renders a desktop and mobile Tutorials button', () => {
    const buttons = context.getAllByText('Tutorials');

    expect(buttons).toHaveLength(2);
  });
});
