import SearchFiltersConverter from './searchFiltersConverter';

it('converts duration search url string to SearchFilterParameters', () => {
  const covnerter = new SearchFiltersConverter();

  expect(covnerter.fromSearchUrl('?duration_min=1&duration_max=11')).toEqual({
    durationMin: 1,
    durationMax: 11,
  });
});
