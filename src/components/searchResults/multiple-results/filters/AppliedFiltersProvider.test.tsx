import { shallow } from 'enzyme';
import React from 'react';
import {
  MockStoreFactory,
  RouterFactory,
} from '../../../../../test-support/factories';
import AppliedFiltersProvider from './AppliedFiltersProvider';
import { AgeRange } from '../../../../types/AgeRange';

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
    const wrapper = getWrapper(
      `?q=hi&duration_min=60&duration_max=180`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      minDuration: 60,
      maxDuration: 180,
      ageRange: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`, <div />);
    expect(wrapper.props()).toEqual({
      minDuration: 180,
      maxDuration: null,
      ageRange: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&duration_max=180`, <div />);
    expect(wrapper.props()).toEqual({
      minDuration: null,
      maxDuration: 180,
      ageRange: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('age range filters', () => {
  it('provides age range with both values', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      ageRange: new AgeRange({ min: 5, max: 11 }),
      minDuration: null,
      maxDuration: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_max=11`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      ageRange: new AgeRange({ min: null, max: 11 }),
      minDuration: null,
      maxDuration: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      ageRange: new AgeRange({ min: 5, max: null }),
      minDuration: null,
      maxDuration: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11&duration_min=60&duration_max=180`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      ageRange: new AgeRange({ min: 5, max: 11 }),
      minDuration: 60,
      maxDuration: 180,
      numberOfFiltersApplied: 2,
    });
  })
})
