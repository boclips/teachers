import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from 'test-support/By';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { setWidth } from 'test-support/setWidth';
import SubjectFilterTag from '../../filters/SubjectFilterTag';
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

it('renders a subject tag when there is a subject filter', () => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: {
        pathname: '',
        search:
          '?q=hashtagfilter&duration_min=1&subject=subject-one-id,subject-two-id',
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

  const subjectTags = wrapper.find(SubjectFilterTag);
  expect(subjectTags).toHaveLength(2);

  expect(subjectTags.get(0).props.subjectId).toEqual('subject-one-id');
  expect(subjectTags.get(1).props.subjectId).toEqual('subject-two-id');
});

it('does not render filter bar with width less than md', () => {
  setWidth(500);

  const wrapper = shallow(<FilterBarWrapper />);

  expect(wrapper.find(FiltersBar)).not.toExist();
});
