import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
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

  return mount(
    <Provider store={store}>
      <AppliedFiltersProvider>
        {React.cloneElement(component)}
      </AppliedFiltersProvider>
    </Provider>,
  );
};

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const wrapper = getWrapper(
      `?q=hi&duration_min=60&duration_max=180`,
      <div />,
    );

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMax: null,
      ageRangeMin: null,
      durationMin: 60,
      durationMax: 180,
      subjectIds: [],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`, <div />);

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: null,
      durationMin: 180,
      durationMax: null,
      subjectIds: [],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&duration_max=180`, <div />);

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      durationMin: null,
      durationMax: 180,
      ageRangeMin: null,
      ageRangeMax: null,
      subjectIds: [],
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

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: 5,
      ageRangeMax: 11,
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const wrapper = getWrapper(`?q=hi&age_range_max=11`, <div />);

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: 11,
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5`, <div />);

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: 5,
      ageRangeMax: null,
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      numberOfFiltersApplied: 1,
    });
  });
});
describe('subject filters', () => {
  it('provides single subject filter', () => {
    const wrapper = getWrapper(`?q=hi&subject=subject-one-id`, <div />);

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: null,
      durationMin: null,
      durationMax: null,
      subjectIds: ['subject-one-id'],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides multiple subject filter', () => {
    const wrapper = getWrapper(
      `?q=hi&subject=subject-one-id,subject-two-id`,
      <div />,
    );

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: null,
      ageRangeMax: null,
      durationMin: null,
      durationMax: null,
      subjectIds: ['subject-one-id', 'subject-two-id'],
      numberOfFiltersApplied: 2,
    });
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11&duration_min=60&duration_max=180`,
      <div />,
    );

    const div = wrapper.find('div');

    expect(div.props()).toEqual({
      ageRangeMin: 5,
      ageRangeMax: 11,
      durationMin: 60,
      durationMax: 180,
      subjectIds: [],
      numberOfFiltersApplied: 2,
    });
  });
});
