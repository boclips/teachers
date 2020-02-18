import { shallow } from 'enzyme';
import * as React from 'react';
import { By } from 'test-support/By';
import SchoolSettings from './SchoolSettings';

describe('school settings', () => {
  it('renders the existing school information', () => {
    const wrapper = shallow(
      <SchoolSettings
        school={'My school'}
        state={'New York'}
        onEdit={jest.fn}
      />,
    );

    expect(wrapper.find(By.dataQa('school-name'))).toHaveText('My school');
    expect(wrapper.find(By.dataQa('state-name'))).toHaveText('New York');
  });
});
