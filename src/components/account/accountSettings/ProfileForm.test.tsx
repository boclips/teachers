import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { ProfileForm } from './ProfileForm';

describe(`Profile form`, () => {
  let wrapper;
  const cancelCallback = jest.fn();
  beforeEach(() => {
    wrapper = mount(
      <ProfileForm
        ages={[]}
        lastName={'test'}
        firstName={'steve'}
        subjects={[]}
        cancelForm={cancelCallback}
      />,
    );
  });

  it(`renders initial name values correctly`, () => {
    expect(
      wrapper
        .find(By.dataQa('first-name'))
        .first()
        .props().value,
    ).toBe('steve');
    expect(
      wrapper
        .find(By.dataQa('last-name'))
        .first()
        .props().value,
    ).toBe('test');
  });

  it(`returns to current account settings when cancel button is clicked`, () => {
    wrapper
      .find(By.dataQa('cancel-edit-button'))
      .first()
      .simulate('click');
    wrapper.update();
    expect(cancelCallback).toHaveBeenCalled();
  });
});
