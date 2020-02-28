import React from 'react';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';

const getWrapper = (query: string) => {
  const store = MockStoreFactory.sampleState({
    router: RouterFactory.sample({
      location: { pathname: '', search: query, hash: '', state: null },
    }),
  });

  const DummyComponent = withAppliedSearchParameters(
    (props: WithAppliedSearchParametersProps) => (
      <div>
        {Object.keys(props).map(key => (
          <div key={key}>{`${key}:${props[key]}`}</div>
        ))}
      </div>
    ),
  );

  return renderWithStore(<DummyComponent />, { initialState: store });
};

const expectSearchParameterProps = (
  wrapper,
  expectedProps: Partial<WithAppliedSearchParametersProps>,
) => {
  expectedProps = {
    query: '',
    durationMin: null,
    durationMax: null,
    subjectIds: [],
    ageRangeMin: null,
    ageRangeMax: null,
    numberOfFiltersApplied: 0,
    ...expectedProps,
  };

  Object.keys(expectedProps).forEach(key => {
    expect(
      wrapper.getByText(`${key}:${expectedProps[key]}`),
    ).toBeInTheDocument();
  });
};

describe('query text', () => {
  it('provides the query text', () => {
    const wrapper = getWrapper(`?q=hi`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      numberOfFiltersApplied: 0,
    });
  });
});

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=60&duration_max=180`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      durationMin: 60,
      durationMax: 180,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const wrapper = getWrapper(`?q=hi&duration_min=180`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      durationMin: 180,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const wrapper = getWrapper(`?q=hi&duration_max=180`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      durationMax: 180,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('age range filters', () => {
  it('provides age range with both values', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5&age_range_max=11`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const wrapper = getWrapper(`?q=hi&age_range_max=11`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const wrapper = getWrapper(`?q=hi&age_range_min=5`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      ageRangeMin: 5,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('subject filters', () => {
  it('provides single subject filter', () => {
    const wrapper = getWrapper(`?q=hi&subject=subject-one-id`);

    expectSearchParameterProps(wrapper, {
      query: 'hi',
      subjectIds: ['subject-one-id'],
      numberOfFiltersApplied: 1,
    });
  });

  it('provides multiple subject filter', () => {
    const wrapper = getWrapper(`?q=hi&subject=subject-one-id,subject-two-id`);
    expectSearchParameterProps(wrapper, {
      query: 'hi',
      subjectIds: ['subject-one-id', 'subject-two-id'],
      numberOfFiltersApplied: 2,
    });
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const wrapper = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11&duration_min=60&duration_max=180`,
    );
    expectSearchParameterProps(wrapper, {
      query: 'hi',
      durationMin: 60,
      durationMax: 180,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 2,
    });
  });
});
