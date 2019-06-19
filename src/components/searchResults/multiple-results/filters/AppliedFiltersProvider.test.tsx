import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
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
      `?q=hi&duration_min=60&duration_max=180`,
      nested,
    );

    expect(wrapper.props()).toEqual({
      durationMin: 60,
      durationMax: 180,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`, <div />);
    expect(wrapper.props()).toEqual({
      durationMin: 180,
      durationMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&duration_max=180`, <div />);
    expect(wrapper.props()).toEqual({
      durationMin: null,
      durationMax: 180,
      numberOfFiltersApplied: 1,
    });
  });
});
