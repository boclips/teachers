import Cookies from 'js-cookie';
import ApiStub from '../../../test-support/ApiStub';
import { CreateAccountPage } from '../../../test-support/page-objects/CreateAccountPage';
import { RegistrationContextService } from '../../services/session/RegistrationContextService';

describe('when view is mounted', () => {
  beforeEach(async () => {
    await new ApiStub().defaultUser();
  });

  it('stores no cookies when no params present after page has loaded', async () => {
    await CreateAccountPage.load();

    const cookies = Cookies.get(
      RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME,
    );

    expect(cookies).toBeUndefined();
  });

  it('stores referral code as cookies after page has loaded', async () => {
    const params = '?REFERRALCODE=1234';
    await CreateAccountPage.load(params);

    const cookies = JSON.parse(
      Cookies.get(RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME),
    );

    expect(cookies.referralCode).toEqual('1234');
  });

  it('stores utm params as cookies after page has loaded', async () => {
    const params =
      '?utm_source=hubspot&utm_term=term&utm_medium=medium&utm_campaign=campaign&utm_content=content';
    await CreateAccountPage.load(params);

    const cookies = JSON.parse(
      Cookies.get(RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME),
    );

    expect(cookies.utmSource).toEqual('hubspot');
    expect(cookies.utmTerm).toEqual('term');
    expect(cookies.utmMedium).toEqual('medium');
    expect(cookies.utmCampaign).toEqual('campaign');
    expect(cookies.utmContent).toEqual('content');
  });
});
