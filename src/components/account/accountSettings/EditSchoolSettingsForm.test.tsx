import React from 'react';
import {
  CountryFactory,
  LinksFactory,
  MockStoreFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { editUser } from 'src/services/users/updateUser';
import { Link } from 'src/types/Link';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { fireEvent, within } from '@testing-library/dom';
import { EditSchoolSettingsForm } from './EditSchoolSettingsForm';

import Mock = jest.Mock;

jest.mock('../../../services/users/updateUser');

describe('School settings form', () => {
  const mockUpdateUser = editUser as Mock;
  const links = LinksFactory.sample({
    activate: new Link({ href: '/users', templated: false }),
  });

  const cancelCallback = jest.fn();

  const getView = () =>
    renderWithBoclipsStore(
      <EditSchoolSettingsForm
        country={CountryFactory.sample({
          id: 'USA',
          name: 'United States',
          states: [
            { id: 'state-1', name: 'State 1' },
            { id: 'NY', name: 'New York' },
          ],
        })}
        toggleForm={cancelCallback}
        links={links}
        userProfile={UserProfileFactory.sample({
          state: { name: 'New York', id: 'NY' },
          school: { name: 'My school', id: '123' },
        })}
      />,
      MockStoreFactory.sampleState(),
    );

  it('populates the form with the existing state and school', () => {
    const view = getView();
    expect(view.getByText('New York')).toBeVisible();
    expect(view.getByText('My school')).toBeVisible();
  });

  it('returns to the account settings page when cancel is clicked', () => {
    const view = getView();

    fireEvent.click(view.getByText('Cancel').closest('button'));

    expect(cancelCallback).toHaveBeenCalled();
  });

  it('if state is changed, the school field becomes blank', async () => {
    const view = getView();

    expect(view.getByText('My school')).toBeVisible();

    fireEvent.mouseDown(
      within(view.getByTestId('states-filter-select')).getByRole('combobox'),
    );

    fireEvent.click(view.getByText('State 1'));

    expect(
      await view.findByText('Enter the name of your school'),
    ).toBeVisible();
    expect(view.queryByText('My school')).toBeNull();
  });

  it('if original state is re-selected, then school field should not change', () => {
    const view = getView();

    fireEvent.mouseDown(
      within(view.getByTestId('states-filter-select')).getByRole('combobox'),
    );

    fireEvent.click(view.getByText('New York', { selector: 'div' }));
    expect(view.getByText('My school')).toBeVisible();
  });

  it('cannot submit the form if the state field is updated, but the school field is not', () => {
    const view = getView();

    fireEvent.mouseDown(
      within(view.getByTestId('states-filter-select')).getByRole('combobox'),
    );

    fireEvent.click(view.getByText('State 1'));

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });
});
