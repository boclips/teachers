import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import {
  CountryFactory,
  LinksFactory,
  MockStoreFactory,
  UserProfileFactory,
} from '../../../../test-support/factories';
import { editUser } from '../../../services/users/updateUser';
import Mock = jest.Mock;
import { Link } from '../../../types/Link';
import { SchoolForm } from '../form/SchoolForm';
import { StatesForm } from '../form/StatesForm';
import { EditSchoolSettingsForm } from './EditSchoolSettingsForm';

jest.mock('../../../services/users/updateUser');

describe('School settings form', () => {
  const mockUpdateUser = editUser as Mock;
  const links = LinksFactory.sample({
    activate: new Link({ href: '/users', templated: false }),
  });

  const cancelCallback = jest.fn();

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={MockStoreFactory.sample()}>
        <EditSchoolSettingsForm
          country={CountryFactory.sample({
            id: 'USA',
            name: 'United States',
            states: [{ id: 'state-1', name: 'State 1' }],
          })}
          toggleForm={cancelCallback}
          links={links}
          userProfile={UserProfileFactory.sample({
            state: { name: 'New York', id: 'NY' },
            school: { name: 'My school', id: '123' },
          })}
        />
      </Provider>,
    );
  });

  it('populates the form with the existing state and school', () => {
    expect(wrapper.find(StatesForm).props().initialValue).toEqual('NY');
    expect(wrapper.find(SchoolForm).props().initialValue).toEqual({
      id: '123',
      name: 'My school',
    });
  });

  it('returns to the account settings page when cancel is clicked', () => {
    wrapper.find(By.dataQa('cancel-edit-button')).hostNodes().props().onClick();

    wrapper.update();

    expect(cancelCallback).toHaveBeenCalled();
  });

  it('if state is changed, the school field becomes blank', () => {
    expect(wrapper.find(SchoolForm).props().initialValue).toEqual({
      id: '123',
      name: 'My school',
    });

    wrapper
      .find(StatesForm)
      .props()
      .onStateChange({ name: 'State 1', id: 'state-1' });

    expect(wrapper.find(SchoolForm).props().value).toBeUndefined();
  });

  it('if original state is re-selected, then school field should not change', () => {
    expect(wrapper.find(SchoolForm).props().initialValue).toEqual({
      id: '123',
      name: 'My school',
    });

    wrapper
      .find(StatesForm)
      .props()
      .onStateChange({ name: 'New York', id: 'NY' });

    expect(wrapper.find(SchoolForm).props().initialValue).toEqual({
      id: '123',
      name: 'My school',
    });
  });

  it('cannot submit the form if the state field is updated, but the school field is not', () => {
    wrapper
      .find(StatesForm)
      .props()
      .onStateChange({ name: 'State 1', id: 'state-1' });

    expect(mockUpdateUser).not.toHaveBeenCalled();
  });
});
