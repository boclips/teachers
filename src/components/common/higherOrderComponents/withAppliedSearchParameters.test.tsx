import React from 'react';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { renderWithStore } from 'test-support/renderWithStore';
import { withAppliedSearchParameters } from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';

const getWrapper = (query: string) => {
  const store = MockStoreFactory.sampleState({
    router: RouterFactory.sample({
      location: { pathname: '', search: query, hash: '', state: null },
    }),
  });
  const spyComponent = jest.fn().mockReturnValue(<div />);

  const DummyComponent = withAppliedSearchParameters(spyComponent);

  renderWithStore(<DummyComponent />, { initialState: store });

  return spyComponent;
};

describe('query text', () => {
  it('provides the query text', () => {
    const spy = getWrapper(`?q=hi`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      numberOfFiltersApplied: 0,
      ageRangeMin: null,
      ageRangeMax: null,
      duration: null,
      subjectIds: [],
    });
  });
});

describe('duration filters', () => {
  it('provides duration with normal range', () => {
    const spy = getWrapper(`?q=hi&duration=60-180`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: [{ min: 60, max: 180 }],
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no max', () => {
    const spy = getWrapper(`?q=hi&duration=180`);
    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: [{ min: 180, max: undefined }],
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid duration with no min', () => {
    const spy = getWrapper(`?q=hi&duration=0-180`);
    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: [{ min: 0, max: 180 }],
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('age range filters', () => {
  it('provides age range with both values', () => {
    const spy = getWrapper(`?q=hi&age_range_min=5&age_range_max=11`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: null,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no min', () => {
    const spy = getWrapper(`?q=hi&age_range_max=11`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: null,
      subjectIds: [],
      ageRangeMin: null,
      ageRangeMax: 11,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides valid age range with no max', () => {
    const spy = getWrapper(`?q=hi&age_range_min=5`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: null,
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });
});

describe('subject filters', () => {
  it('provides single subject filter', () => {
    const spy = getWrapper(`?q=hi&subject=subject-one-id`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: null,
      subjectIds: ['subject-one-id'],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 1,
    });
  });

  it('provides multiple subject filter', () => {
    const spy = getWrapper(`?q=hi&subject=subject-one-id,subject-two-id`);

    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: null,
      subjectIds: ['subject-one-id', 'subject-two-id'],
      ageRangeMin: null,
      ageRangeMax: null,
      numberOfFiltersApplied: 2,
    });
  });
});

describe('number of filters applied', () => {
  it('calculates correctly for multiple filters', () => {
    const spy = getWrapper(
      `?q=hi&age_range_min=5&age_range_max=11&duration=60-180`,
    );
    expect(spy.mock.calls[0][0]).toEqual({
      query: 'hi',
      duration: [{ min: 60, max: 180 }],
      subjectIds: [],
      ageRangeMin: 5,
      ageRangeMax: 11,
      numberOfFiltersApplied: 2,
    });
  });
});
