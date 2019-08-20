import Cookies from 'js-cookie';
import { RegistrationContext } from './RegistrationContext';
import { RegistrationContextService } from './RegistrationContextService';

describe('registration context', () => {
  beforeEach(() => {
    Cookies.remove(RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME);
  });

  it('can store and retrieve a registration context', async () => {
    const registrationContextService = new RegistrationContextService();
    const registrationContext: RegistrationContext = {
      referralCode: '1234',
      utmSource: 'some-source-value',
      utmTerm: 'some-term-value',
      utmMedium: 'some-medium-value',
      utmCampaign: 'some-campaign-value',
      utmContent: 'some-content-value',
    };

    registrationContextService.store(registrationContext);

    expect(registrationContextService.retrieve()).toEqual(registrationContext);
  });

  it('does not store an empty registration context', () => {
    const registrationContextService = new RegistrationContextService();

    registrationContextService.store({} as any);

    expect(registrationContextService.retrieve()).toBeUndefined();
  });

  it('does not store a registration context with all undefined fields', () => {
    const registrationContextService = new RegistrationContextService();

    registrationContextService.store({
      referralCode: undefined,
    } as any);

    expect(registrationContextService.retrieve()).toBeUndefined();
  });
});
