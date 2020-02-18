import axios from 'axios';
import { Links } from 'src/types/Links';

export interface CreateAccountRequest {
  email: string;
  password: string;
  analyticsId: string;
  utmSource: string;
  utmContent: string;
  utmTerm: string;
  utmCampaign: string;
  utmMedium: string;
  referralCode: string;
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
