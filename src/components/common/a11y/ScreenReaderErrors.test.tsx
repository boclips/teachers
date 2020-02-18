import { shallow } from 'enzyme';
import React from 'react';
import { By } from 'test-support/By';
import { ScreenReaderErrors } from './ScreenReaderErrors';

describe('displaying errors', () => {
  const formErrors = [
    { field: 'name', message: 'Name is required' },
    { field: 'email', message: 'Please enter a valid email address' },
  ];

  const wrapper = shallow(<ScreenReaderErrors errors={formErrors} />);

  it('renders field and message for each error', () => {
    expect(wrapper.find(By.dataQa('error')).length).toBe(2);
    expect(getError(0)).toEqual('name: Name is required');
    expect(getError(1)).toEqual('email: Please enter a valid email address');
  });

  function getError(index: number) {
    return wrapper
      .find(By.dataQa('error'))
      .at(index)
      .text();
  }
});
