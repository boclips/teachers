import { mount } from 'enzyme';
import * as React from 'react';
import By from '../../../test-support/By';
import { DisciplineFactory } from '../../../test-support/factories';
import DisciplineLogo from './DisciplineLogo';

describe('discipline logo selection', () => {
  it('renders the correct svg when given the discipline name', () => {
    const wrapper = mount(
      <DisciplineLogo
        discipline={DisciplineFactory.sample({ name: 'stem' })}
      />,
    );

    expect(wrapper.find(By.dataQa('stem-icon')));
  });
});
