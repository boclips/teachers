import { convertAgeRangesFromString } from 'src/components/ageRanges/convertAgeRangesFromString';
import { generateVideoSearchQuery } from './generateVideoSearchQuery';

describe('generateNewUri', () => {
  it('empty request', () => {
    const queryParams = generateVideoSearchQuery({}, []);

    expect(queryParams.page).toEqual(1);
  });

  it('single request', () => {
    const queryParams = generateVideoSearchQuery({}, [{ q: 'london' }]);

    expect(queryParams.q).toEqual('london');
    expect(queryParams.page).toEqual(1);
  });

  it('existing query params', () => {
    const queryParams = generateVideoSearchQuery(
      { subject: ['345'], duration: ['0-120'], resource_types: ['ACTIVITY'] },
      [
        { q: 'london' },
        {
          age_range: convertAgeRangesFromString(['3-5']),
          resource_types: ['LESSON_PLAN'],
        },
      ],
    );

    expect(queryParams.duration).toEqual(['0-120']);
    expect(queryParams.q).toEqual('london');
    expect(queryParams.subject).toEqual(['345']);
    expect(queryParams.age_range).toEqual(['3-5']);
    expect(queryParams.resource_types).toEqual(['LESSON_PLAN']);
    expect(queryParams.page).toEqual(1);
  });

  it('handles completionId', () => {
    const queryParams = generateVideoSearchQuery({}, [
      { q: 'london', completion_id: 'comp123' },
    ]);

    expect(queryParams.completion_id).toEqual('comp123');
  });
});
