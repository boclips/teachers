import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../test-support/By';
import EventSimulator from '../../../test-support/EventSimulator';
import AddNoResultsForm from './AddNoResultsForm';

it('invokes the callback when the form is submitted', () => {
  const onSubmit = jest.fn();

  let wrapper = mount(
    <AddNoResultsForm onSubmit={onSubmit} query={'testquerynomatches'} />,
  );
  wrapper = new EventSimulator(wrapper).setText(
    'some-name',
    wrapper.find(By.dataQa('name', 'input')),
  );
  wrapper = new EventSimulator(wrapper).setText(
    'some query',
    wrapper.find(By.dataQa('query', 'input')),
  );
  wrapper = new EventSimulator(wrapper).setText(
    'somemail@boclips.com',
    wrapper.find(By.dataQa('email-address', 'input')),
  );
  wrapper = new EventSimulator(wrapper).setText(
    'some information',
    wrapper.find(By.dataQa('information', 'input')),
  );
  new EventSimulator(wrapper).click(
    wrapper.find(By.dataQa('no-results-submit', 'button')),
  );

  const expectedData = {
    name: 'some-name',
    query: 'some query',
    mailAddress: 'somemail@boclips.com',
    information: 'some information',
  };

  expect(onSubmit).toBeCalledWith(expectedData);
});
