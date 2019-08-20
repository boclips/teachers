import Cookies from 'js-cookie';
import { RegistrationContext } from './RegistrationContext';

export class RegistrationContextService {
  public store(registrationContext: RegistrationContext) {
    Cookies.set('registrationContext', JSON.stringify(registrationContext));
  }

  public retrieve() {
    return JSON.parse(Cookies.get('registrationContext'));
  }
}
