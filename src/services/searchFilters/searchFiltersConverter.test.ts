import { parseSearchParametersFromUrl } from './searchFiltersConverter';

it('converts duration search url string to SearchFilterParameters', () => {
  expect(
    parseSearchParametersFromUrl('?duration_min=1&duration_max=11'),
  ).toEqual({
    query: null,
    durationMin: 1,
    durationMax: 11,
    ageRangeMin: null,
    ageRangeMax: null,
    subject: [],
  });
});

it('converts age range search url string to SearchFilterParameters', () => {
  expect(
    parseSearchParametersFromUrl('?age_range_min=1&age_range_max=11'),
  ).toEqual({
    query: null,
    durationMin: null,
    durationMax: null,
    ageRangeMin: 1,
    ageRangeMax: 11,
    subject: [],
  });
});

it('converts a single subject in the search url string to SearchFilterParameters', () => {
  expect(parseSearchParametersFromUrl('?subject=1')).toEqual({
    query: null,
    durationMin: null,
    durationMax: null,
    ageRangeMin: null,
    ageRangeMax: null,
    subject: ['1'],
  });
});

it('converts multiple subjects in the search url string to SearchFilterParameters', () => {
  expect(parseSearchParametersFromUrl('?subject=1,2,3')).toEqual({
    query: null,
    durationMin: null,
    durationMax: null,
    ageRangeMin: null,
    ageRangeMax: null,
    subject: ['1', '2', '3'],
  });
});
