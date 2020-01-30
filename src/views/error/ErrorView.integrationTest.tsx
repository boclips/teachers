import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithStore } from '../../../test-support/renderWithStore';
import { ErrorView } from './ErrorView';

describe('ErrorView', () => {
  it('renders the helper message', () => {
    const view = renderWithStore(<ErrorView />);

    expect(view.getByText('Oops!!')).toBeVisible();
    expect(
      view.getByText(
        'You can start a new search or explore our subject list in the top bar or',
      ),
    ).toBeVisible();
  });

  it('contains a link to return the user to the HomePage', async () => {
    const view = renderWithStore(<ErrorView />);
    const homePageLink = view.getByText('return to the homepage');
    expect(homePageLink);

    await fireEvent.click(homePageLink);

    expect(view.findByText("I'm looking for a video about:"));
  });

  it('does not render searchbar and navigation menu when non-recoverable', () => {
    const view = renderWithStore(<ErrorView nonRecoverable={true} />);

    expect(view.queryByText('Search')).not.toBeInTheDocument();
    expect(view.queryByText('Your account')).not.toBeInTheDocument();
  });
});
