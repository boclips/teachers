import { convertQueryToSearchParameters } from './searchParametersConverter';

describe('convertQueryToSearchParameters', () => {
  it('converts duration search url string to SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters('?duration=1-11');
    expect(searchParameters.query).toEqual(null);
    expect(searchParameters.duration[0].serialise()).toEqual('1-11');
    expect(searchParameters.ageRangeMin).toEqual(null);
    expect(searchParameters.ageRangeMax).toEqual(null);
    expect(searchParameters.subject).toEqual([]);
  });

  it('converts two duration filters SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters(
      '?duration=1-11&duration=14-19',
    );
    expect(searchParameters.query).toEqual(null);
    expect(searchParameters.duration[0].serialise()).toEqual('1-11');
    expect(searchParameters.duration[1].serialise()).toEqual('14-19');
    expect(searchParameters.ageRangeMin).toEqual(null);
    expect(searchParameters.ageRangeMax).toEqual(null);
    expect(searchParameters.subject).toEqual([]);
  });

  it('converts age range search url string to SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters(
      '?age_range_min=1&age_range_max=11',
    );
    expect(searchParameters.query).toEqual(null);
    expect(searchParameters.duration).toEqual(null);
    expect(searchParameters.ageRangeMin).toEqual(1);
    expect(searchParameters.ageRangeMax).toEqual(11);
    expect(searchParameters.subject).toEqual([]);
  });

  it('converts a single subject in the search url string to SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters('?subject=1');
    expect(searchParameters.query).toEqual(null);
    expect(searchParameters.duration).toEqual(null);
    expect(searchParameters.ageRangeMin).toEqual(null);
    expect(searchParameters.ageRangeMax).toEqual(null);
    expect(searchParameters.subject).toEqual(['1']);
  });

  it('converts multiple subjects in the search url string to SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters('?subject=1,2,3');
    expect(searchParameters.query).toEqual(null);
    expect(searchParameters.duration).toEqual(null);
    expect(searchParameters.ageRangeMin).toEqual(null);
    expect(searchParameters.ageRangeMax).toEqual(null);
    expect(searchParameters.subject).toEqual(['1', '2', '3']);
  });
});
