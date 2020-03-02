import {
  parseRanges,
  parseSearchFiltersFromUrl,
} from './searchFiltersConverter';

it('converts a duration ranges', () => {
  expect(parseRanges(['15', '1-11'])).toEqual([
    {
      min: 15,
    },
    {
      min: 1,
      max: 11,
    },
  ]);
});
it('converts a duration range', () => {
  expect(parseRanges('1-11')).toEqual([
    {
      min: 1,
      max: 11,
    },
  ]);
});
it('converts a lowerbound duration range', () => {
  expect(parseRanges('4')).toEqual([
    {
      min: 4,
      max: undefined,
    },
  ]);
});
it('converts duration search url string to SearchFilterParameters', () => {
  expect(parseSearchFiltersFromUrl('?duration=1-11')).toEqual({
    duration: [{ min: 1, max: 11 }],
    ageRangeMin: null,
    ageRangeMax: null,
    subject: [],
  });
});
it('converts two duration filters SearchFilterParameters', () => {
  expect(parseSearchFiltersFromUrl('?duration=1-11&duration=14-19')).toEqual({
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
    parseSearchFiltersFromUrl('?age_range_min=1&age_range_max=11'),
  ).toEqual({
    duration: null,
    ageRangeMin: 1,
    ageRangeMax: 11,
    subject: [],
  });
});

it('converts a single subject in the search url string to SearchFilterParameters', () => {
  expect(parseSearchFiltersFromUrl('?subject=1')).toEqual({
    duration: null,
    ageRangeMin: null,
    ageRangeMax: null,
    subject: ['1'],
  });
});

it('converts multiple subjects in the search url string to SearchFilterParameters', () => {
  expect(parseSearchFiltersFromUrl('?subject=1,2,3')).toEqual({
    duration: null,
    ageRangeMin: null,
    ageRangeMax: null,
    subject: ['1', '2', '3'],
  });
});
