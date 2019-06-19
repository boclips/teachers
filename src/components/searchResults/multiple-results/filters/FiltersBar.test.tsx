import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../../test-support/By';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import { setWidth } from '../../../../../test-support/setWidth';
import FiltersBarWrapper, { FiltersBar } from './FiltersBar';
import FilterBarWrapper from './FiltersBar';

it('does not render anything if there are no filters', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: { pathname: '', search: '?q=nofilters', hash: '', state: null },
    }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <FiltersBarWrapper />
    </Provider>,
  );

  expect(wrapper.find(FiltersBar)).toBeEmptyRender();
});

it('renders text when there are valid filters', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search: '?q=nofilters&duration_min=1',
        hash: '',
        state: null,
      },
    }),
  });

  const wrapper = mount(
    <Provider store={store}>
      <FiltersBarWrapper />
    </Provider>,
  );

  expect(
    wrapper.find(FiltersBar).find(By.dataQa('filters-bar-label')),
  ).toExist();
});

it('does not render filter bar with width less than md', () => {
  setWidth(500);

  const wrapper = shallow(<FilterBarWrapper />);

  expect(wrapper.find(FiltersBar)).not.toExist();
});
