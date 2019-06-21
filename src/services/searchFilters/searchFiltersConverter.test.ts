import SearchFiltersConverter from './searchFiltersConverter';

it('converts duration search url string to SearchFilterParameters', () => {
  const converter = new SearchFiltersConverter();

  expect(converter.fromSearchUrl('?duration_min=1&duration_max=11')).toEqual({
    durationMin: 1,
    durationMax: 11,
    ageRangeMin: null,
    ageRangeMax: null,
  });
});

it('converts age range search url string to SearchFilterParameters', () => {
  const converter = new SearchFiltersConverter();

  expect(converter.fromSearchUrl('?age_range_min=1&age_range_max=11')).toEqual({
    durationMin: null,
    durationMax: null,
    ageRangeMin: 1,
    ageRangeMax: 11,
  });
});
