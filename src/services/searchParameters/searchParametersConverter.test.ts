import { convertQueryToSearchParameters } from './searchParametersConverter';

describe('convertQueryToSearchParameters', () => {
  it('converts duration search url string to SearchFilterParameters', () => {
    expect(convertQueryToSearchParameters('?duration=1-11')).toEqual({
      query: null,
      duration: [{ min: 1, max: 11 }],
      ageRangeMin: null,
      ageRangeMax: null,
      subject: [],
    });
  });

  it('converts two duration filters SearchFilterParameters', () => {
    expect(
      convertQueryToSearchParameters('?duration=1-11&duration=14-19'),
    ).toEqual({
      query: null,
      duration: [
        { min: 1, max: 11 },
        { min: 14, max: 19 },
      ],
      ageRangeMin: null,
      ageRangeMax: null,
      subject: [],
    });
  });

  it('converts age range search url string to SearchFilterParameters', () => {
    expect(
      convertQueryToSearchParameters('?age_range_min=1&age_range_max=11'),
    ).toEqual({
      query: null,
      duration: null,
      ageRangeMin: 1,
      ageRangeMax: 11,
      subject: [],
    });
  });

  it('converts a single subject in the search url string to SearchFilterParameters', () => {
    expect(convertQueryToSearchParameters('?subject=1')).toEqual({
      query: null,
      duration: null,
      ageRangeMin: null,
      ageRangeMax: null,
      subject: ['1'],
    });
  });

  it('converts multiple subjects in the search url string to SearchFilterParameters', () => {
    expect(convertQueryToSearchParameters('?subject=1,2,3')).toEqual({
      query: null,
      duration: null,
      ageRangeMin: null,
      ageRangeMax: null,
      subject: ['1', '2', '3'],
    });
  });
});
