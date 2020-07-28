import React from 'react';
import { editUser } from 'src/services/users/updateUser';
import {
  LinksFactory,
  MockStoreFactory,
  SubjectsFactory,
  UserProfileFactory,
} from 'test-support/factories';
import { Link } from 'src/types/Link';
import {
  renderWithBoclipsStore,
  ResultingContext,
} from 'test-support/renderWithStore';
import { fireEvent, within } from '@testing-library/dom';
import eventually from 'test-support/eventually';
import { EditProfileForm } from './EditProfileForm';
import Mock = jest.Mock;

jest.mock('../../../services/users/updateUser');

const mockUpdateUser = editUser as Mock;
const links = LinksFactory.sample({
  activate: new Link({ href: '/users', templated: false }),
});

describe(`Profile form`, () => {
  const cancelCallback = jest.fn();

  const getView = (): ResultingContext =>
    renderWithBoclipsStore(
      <EditProfileForm
        userProfile={UserProfileFactory.sample()}
        toggleForm={cancelCallback}
        links={links}
      />,
      MockStoreFactory.sampleState({
        subjects: SubjectsFactory.sample(),
      }),
    );

  it(`renders initial values correctly`, () => {
    const view = getView();
    expect(view.getByDisplayValue('joe')).toBeVisible();
    expect(view.getByDisplayValue('boclips')).toBeVisible();
    expect(view.getByText('3-5')).toBeVisible();
    expect(view.getByText('5-9')).toBeVisible();
    expect(view.getByText('subject one')).toBeVisible();
    expect(view.getByText('subject two')).toBeVisible();
  });

  it(`returns to current account settings when cancel button is clicked`, () => {
    const view = getView();
    fireEvent.click(view.getByText('Cancel').closest('button'));
    expect(cancelCallback).toHaveBeenCalled();
  });

  it(`sends an updateuser request with the correct values`, async () => {
    const view = getView();

    fireEvent.change(view.getByPlaceholderText('Enter first name'), {
      target: { value: 'new first name' },
    });

    fireEvent.change(view.getByPlaceholderText('Enter last name'), {
      target: { value: 'new last name' },
    });

    fireEvent.mouseDown(
      within(view.getByTestId('subjects')).getByRole('combobox'),
    );
    fireEvent.click(
      view.getByText('subject two', {
        selector: 'div.ant-select-item-option-content',
      }),
    );

    fireEvent.mouseDown(
      within(view.getByTestId('age-select')).getByRole('combobox'),
    );
    fireEvent.click(view.getByText('11-14'));

    fireEvent.click(view.getByText('Save changes').closest('button'));

    await eventually(() => {
      expect(mockUpdateUser).toHaveBeenCalledWith(links, {
        firstName: 'new first name',
        lastName: 'new last name',
        subjects: ['subject-one-id'],
        ages: [3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14],
      });
    });
  });
});
