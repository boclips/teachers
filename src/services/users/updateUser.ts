import axios from 'axios';
import { Links } from '../../types/Links';
import Utm from '../account/Utm';
import AnalyticsFactory from '../analytics/AnalyticsFactory';

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
}

export function onboardUser(
  links: Links,
  request: UpdateUserRequest,
  email: string,
): Promise<void> {
  if (userCannotUpdate(links)) {
    Promise.reject();
  }

  return updateUser(links, request, () => {
    AnalyticsFactory.externalAnalytics().trackOnboardingCompleted();
    AnalyticsFactory.externalAnalytics().createUserProfile(request, email);
  });
}

export function editUser(
  links: Links,
  request: UpdateUserRequest,
): Promise<void> {
  if (userCannotUpdate(links)) {
    Promise.reject();
  }

  return updateUser(links, request);
}

function userCannotUpdate(links: Links) {
  return !links.profile;
}

function updateUser(
  links: Links,
  request: UpdateUserRequest,
  callback?: () => void,
) {
  return axios.put(links.profile.getOriginalLink(), request).then(callback);
}
