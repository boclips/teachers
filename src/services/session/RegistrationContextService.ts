import Cookies from 'js-cookie';
import { RegistrationContext } from './RegistrationContext';

export class RegistrationContextService {
  public static REGISTRATION_CONTEXT_COOKIE_NAME = 'registrationContext';

  public store(registrationContext: RegistrationContext) {
    const stringifiedContext = JSON.stringify(registrationContext);
    if (Object.keys(JSON.parse(stringifiedContext)).length === 0) {
      return;
    }

    Cookies.set(
      RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME,
      stringifiedContext,
    );
  }

  public retrieve() {
    const registrationContextCookie = Cookies.get(
      RegistrationContextService.REGISTRATION_CONTEXT_COOKIE_NAME,
    );

    if (registrationContextCookie) {
      return JSON.parse(registrationContextCookie);
    } else {
      return undefined;
    }
  }
}
