import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { ProfileForm } from './ProfileForm';

describe(`Profile form`, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <ProfileForm
        ages={[]}
        lastName={'test'}
        firstName={'steve'}
        subjects={[]}
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
});
