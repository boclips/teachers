import { extractQueryParam } from './extractQueryParam';

describe('extractQueryParam', () => {
  it('can extract first param', () => {
    expect(extractQueryParam('?REFERRALCODE=abc', 'REFERRALCODE')).toEqual(
      'abc',
    );
  });

  it('can extract subsequent param', () => {
    expect(
      extractQueryParam('?anotherParam=1&REFERRALCODE=abc', 'REFERRALCODE'),
    ).toEqual('abc');
  });

  it('cannot extract missing param', () => {
    expect(extractQueryParam('?utm_source=whateva', 'utm_medium')).toEqual(
      undefined,
    );
  });

  it('can deal with empty string', () => {
    expect(extractQueryParam('', 'utm_medium')).toEqual(undefined);
  });

  it('can deal with undefined', () => {
    expect(extractQueryParam(undefined, 'utm_medium')).toEqual(undefined);
  });
});
