import axios from 'axios';
import { Links } from '../../types/Links';

export interface CreateAccountRequest {
  firstName: string;
  lastName: string;
  subjects: string;
  email: string;
  password: string;
  analyticsId: string;
  referralCode: string;
  hasOptedIntoMarketing: boolean;
}

export const createAccount = (
  links: Links,
  request: CreateAccountRequest,
): Promise<boolean> => {
  if (!links.createAccount) {
    return Promise.reject();
  }
  return axios
    .post(links.createAccount.getOriginalLink(), request)
    .then(() => true);
};
