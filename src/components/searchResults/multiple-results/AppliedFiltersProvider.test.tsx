import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import AppliedFiltersProvider from './AppliedFiltersProvider';

const getWrapper = (query: string, component: React.ReactElement) => {
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample({
      location: { pathname: '', search: query, hash: '', state: null },
    }),
  });

  return shallow(
    <AppliedFiltersProvider>
      {React.cloneElement(component)}
    </AppliedFiltersProvider>,
    {
      context: { store },
    },
  ).dive();
};

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const nested = <div />;
    const wrapper = getWrapper(
      `?q=hi&min_duration=60&max_duration=180`,
      nested,
    );

    expect(wrapper.props()).toEqual({
      minDuration: 60,
      maxDuration: 180,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&min_duration=180`, <div />);
    expect(wrapper.props()).toEqual({
      minDuration: 180,
      maxDuration: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&max_duration=180`, <div />);
    expect(wrapper.props()).toEqual({
      minDuration: null,
      maxDuration: 180,
      numberOfFiltersApplied: 1,
    });
  });
});
