import { extractReferralCode } from './extractReferralCode';

describe('extractReferralCode', () => {
  it('extracts referral code as first query param', () => {
    expect(extractReferralCode('?REFERRALCODE=abc')).toEqual('abc');
  });
  it('extracts referral code as the second query param', () => {
    expect(extractReferralCode('?anotherParam=1&REFERRALCODE=abc')).toEqual(
      'abc',
    );
  });
});
