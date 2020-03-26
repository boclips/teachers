import React from 'react';
import { fireEvent } from '@testing-library/react';
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

  describe('Help menu', () => {
    it('Renders a desktop Help button', () => {
      const buttons = context.getAllByText('Help');

      expect(buttons).toHaveLength(2);
    });

    describe('Submenu', () => {
      beforeEach(() => {
        const helpMenu = context.getAllByText('Help')[0];
        fireEvent.click(helpMenu);
      });
      it('Renders a Tutorials link', () => {
        const buttons = context.getAllByText('Tutorials');

        expect(buttons).toHaveLength(1);
      });

      it('Renders a Remote Learning link', () => {
        const buttons = context.getAllByText('Remote learning');

        expect(buttons).toHaveLength(1);
      });
      it('Renders a Teacher Training link', () => {
        const buttons = context.getAllByText('Teacher training');

        expect(buttons).toHaveLength(1);
      });
    });
  });
});
