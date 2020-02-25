import React from 'react';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import {
  withAppliedSearchFilters,
  WithAppliedSearchFiltersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchFilters';
import { renderWithStore } from 'test-support/renderWithStore';

const getWrapper = (query: string) => {
  const store = MockStoreFactory.sampleState({
    router: RouterFactory.sample({
      location: { pathname: '', search: query, hash: '', state: null },
    }),
  });

  const DummyComponent = withAppliedSearchFilters(
    (props: WithAppliedSearchFiltersProps) => (
      <div>
        {Object.keys(props).map(key => (
          <div key={key}>{`${key}:${props[key]}`}</div>
        ))}
      </div>
    ),
  );

  return renderWithStore(<DummyComponent />, { initialState: store });
};

const expectFilterProps = (wrapper, expectedProps) => {
  Object.keys(expectedProps).forEach(key => {
    expect(
      wrapper.getByText(`${key}:${expectedProps[key]}`),
    ).toBeInTheDocument();
  });
};

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=60&duration_max=180`);

    expectFilterProps(wrapper, {
      durationMin: 60,
      durationMax: 180,
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`);

    expectFilterProps(wrapper, {
      durationMin: 180,
      durationMax: null,
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&duration_max=180`);

    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: 180,
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('age range filters', () => {
  it('provides age range with both values', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5&age_range_max=11`);

    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const wrapper = getWrapper(`?q=hi&age_range_max=11`);

    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5`);

    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: null,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('subject filters', () => {
  it('provides single subject filter', () => {
    const wrapper = getWrapper(`?q=hi&subject=subject-one-id`);

    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: null,
      subjectIds: ['subject-one-id'],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides multiple subject filter', () => {
    const wrapper = getWrapper(`?q=hi&subject=subject-one-id,subject-two-id`);
    expectFilterProps(wrapper, {
      durationMin: null,
      durationMax: null,
      subjectIds: ['subject-one-id', 'subject-two-id'],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 2,
    });
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11&duration_min=60&duration_max=180`,
    );
    expectFilterProps(wrapper, {
      durationMin: 60,
      durationMax: 180,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 2,
    });
  });
});
