import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';
import { requestToQueryParameters } from 'src/services/searchParameters/generateVideoSearchQuery';
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

  it('converts a combination of filters to SearchFilterParameters', () => {
    const searchParameters = convertQueryToSearchParameters(
      '?q=hello&age_range=3-5&subject=1,2&duration=0-120',
    );

    expect(searchParameters.query).toEqual('hello');
    expect(searchParameters.duration[0].min).toEqual(0);
    expect(searchParameters.duration[0].max).toEqual(120);
    expect(searchParameters.ageRangeMin).toEqual(null);
    expect(searchParameters.ageRangeMax).toEqual(null);
    expect(searchParameters.ageRange[0].resolveMin()).toEqual(3);
    expect(searchParameters.ageRange[0].resolveMax()).toEqual(5);
    expect(searchParameters.subject).toEqual(['1', '2']);
  });
});

describe('requestToQueryParameters', () => {
  it('converts filters to a query string', () => {
    const request = {
      subject: ['1'],
      age_range: [new AgeRange(3, 5)],
      duration: [new DurationRange({ min: 0, max: 120 })],
      pathname: 'videos',
      q: 'hello',
      page: 1,
    };

    const queryParams = requestToQueryParameters(request);

    expect(queryParams).toEqual({
      age_range: ['3-5'],
      duration: ['0-120'],
      page: 1,
      pathname: 'videos',
      q: 'hello',
      subject: ['1'],
    });
  });
});
