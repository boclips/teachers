import { RegistrationContext } from './RegistrationContext';
import { RegistrationContextService } from './RegistrationContextService';

it('can store and retrieve a registration context', async () => {
  const registrationContextService = new RegistrationContextService();
  const registrationContext: RegistrationContext = {
    referralCode: '1234',
    utm: {
      source: 'some-source-value',
      term: 'some-term-value',
      medium: 'some-medium-value',
      campaign: 'some-campaign-value',
      content: 'some-content-value',
    },
  };

  registrationContextService.store(registrationContext);

  expect(registrationContextService.retrieve()).toEqual(registrationContext);
});
