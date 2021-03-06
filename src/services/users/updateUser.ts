import axios, { AxiosResponse } from 'axios';
import { Links } from '../../types/Links';
import Utm from '../account/Utm';

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  subjects?: string[];
  country?: string;
  state?: string;
  ages?: number[];
  hasOptedIntoMarketing?: boolean;
  referralCode?: string;
  utm?: Utm;
  schoolName?: string;
  schoolId?: string;
  role?: string;
}

export function onboardUser(
  links: Links,
  request: UpdateUserRequest,
): Promise<void | AxiosResponse> {
  if (userCannotActivate(links) || userCannotUpdate(links)) {
    return Promise.reject();
  }

  return updateUser(links, request);
}

export function editUser(
  links: Links,
  request: UpdateUserRequest,
): Promise<void | AxiosResponse> {
  if (userCannotUpdate(links)) {
    return Promise.reject();
  }

  return updateUser(links, request);
}

function userCannotActivate(links: Links) {
  return !links.activate;
}

function userCannotUpdate(links: Links) {
  return !links.profile;
}

function updateUser(
  links: Links,
  request: UpdateUserRequest,
): Promise<void | AxiosResponse> {
  return axios.put(links.profile.getOriginalLink(), request).catch((error) => {
    console.error('An error occurred while updating the user', error);
  });
}
