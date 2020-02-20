import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import EventSimulator from '../../../../test-support/EventSimulator';
import {
  LinksFactory,
  MockStoreFactory,
  SubjectsFactory,
  UserProfileFactory,
} from '../../../../test-support/factories';
import { editUser } from '../../../services/users/updateUser';
import { AgeRange } from '../../../types/AgeRange';
import { Link } from '../../../types/Link';
import { SelectAgeRange } from '../../multipleSelect/SelectAgeRange';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';
import { EditProfileForm } from './EditProfileForm';
import Mock = jest.Mock;

jest.mock('../../../services/users/updateUser');

const mockUpdateUser = editUser as Mock;
const links = LinksFactory.sample({
  activate: new Link({ href: '/users', templated: false }),
});

describe(`Profile form`, () => {
  let wrapper;
  const cancelCallback = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <Provider store={MockStoreFactory.sample()}>
        <EditProfileForm
          userProfile={UserProfileFactory.sample()}
          subjects={SubjectsFactory.sample()}
          toggleForm={cancelCallback}
          links={links}
        />
      </Provider>,
    );
  });

  it(`renders initial name values correctly`, () => {
    expect(
      wrapper
        .find(By.dataQa('first-name'))
        .first()
        .props().value,
    ).toBe('joe');
    expect(
      wrapper
        .find(By.dataQa('last-name'))
        .first()
        .props().value,
    ).toBe('boclips');
    expect(
      wrapper
        .find(By.dataQa('subject-select'))
        .first()
        .props().value,
    ).toContainEqual('subject-one-id');
    expect(
      wrapper
        .find(By.dataQa('age-select-input'))
        .first()
        .props().value,
    ).toContainEqual(new AgeRange(3, 5).encodeJSON());
  });

  it(`returns to current account settings when cancel button is clicked`, () => {
    wrapper
      .find(By.dataQa('cancel-edit-button'))
      .first()
      .simulate('click');
    wrapper.update();
    expect(cancelCallback).toHaveBeenCalled();
  });

  it(`sends an updateuser request with the correct values`, () => {
    wrapper
      .find(SelectAgeRange)
      .find('.ant-select')
      .simulate('click');

    const events = new EventSimulator(wrapper);
    events.setText(
      'new first name',
      wrapper.find(By.dataQa('first-name', 'input')),
    );
    events.setText(
      'new last name',
      wrapper.find(By.dataQa('last-name', 'input')),
    );

    const ageRangeOptions = wrapper.find('Trigger').find('MenuItem');
    ageRangeOptions
      .find(`[data-qa="11-14"]`)
      .first()
      .simulate('click');

    wrapper.find(SelectSubjects).simulate('click');

    const menuItems = wrapper.find('Trigger').find('MenuItem');

    menuItems
      .find(`[data-qa="subject-two-id"]`)
      .first()
      .simulate('click');
    wrapper.update();

    wrapper.find(By.dataQa('submit-update-user', 'button')).simulate('click');

    expect(mockUpdateUser).toHaveBeenCalledWith(links, {
      firstName: 'new first name',
      lastName: 'new last name',
      subjects: ['subject-one-id'],
      ages: [3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14],
    });
  });
});
