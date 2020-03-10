import { DurationRange } from 'src/types/DurationRange';
import { AgeRange } from 'src/types/AgeRange';
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

  it('multiple updates', () => {
    const queryParams = generateVideoSearchQuery({}, [
      { duration: [DurationRange.fromString('3-5')] },
      { q: 'london' },
      { subject: ['123'] },
    ]);

    expect(queryParams.duration).toEqual(['3-5']);
    expect(queryParams.q).toEqual('london');
    expect(queryParams.subject).toEqual(['123']);
    expect(queryParams.page).toEqual(1);
  });

  it('existing query params', () => {
    const queryParams = generateVideoSearchQuery(
      { subject: ['345'], duration: ['0-120'] },
      [
        { q: 'london' },
        {
          age_range: AgeRange.fromStrings(['3-5']),
        },
      ],
    );

    expect(queryParams.duration).toEqual(['0-120']);
    expect(queryParams.q).toEqual('london');
    expect(queryParams.subject).toEqual(['345']);
    expect(queryParams.age_range).toEqual(['3-5']);
    expect(queryParams.page).toEqual(1);
  });
});
