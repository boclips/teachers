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
    const wrapper = getWrapper(
      `?q=hi&duration_min=60&duration_max=180`,
      <div />,
    );

    expect(wrapper.props()).toEqual({
      ageRangeMax: null,
      ageRangeMin: null,
      durationMin: 60,
      durationMax: 180,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`, <div />);
    expect(wrapper.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: null,
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
      ageRangeMin: null,
      ageRangeMax: null,
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
      ageRangeMin: 5,
      ageRangeMax: 11,
      durationMin: null,
      durationMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const wrapper = getWrapper(`?q=hi&age_range_max=11`, <div />);

    expect(wrapper.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: 11,
      durationMin: null,
      durationMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5`, <div />);

    expect(wrapper.props()).toEqual({
      ageRangeMin: 5,
      ageRangeMax: null,
      durationMin: null,
      durationMax: null,
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
      ageRangeMin: 5,
      ageRangeMax: 11,
      durationMin: 60,
      durationMax: 180,
      numberOfFiltersApplied: 2,
    });
  });
});
