import axios from 'axios';
import { Links } from '../../types/Links';
import Utm from '../account/Utm';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { UserProfile } from './UserProfile';

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  subjects: string;
  country: string;
  ages: number[];
  hasOptedIntoMarketing: boolean;
  referralCode: string;
  utm: Utm;
}

export default function updateUser(
  links: Links,
  userProfile: UserProfile,
): Promise<void> {
  if (userCannotUpdate(links)) {
    Promise.reject();
  }

  const request: UpdateUserRequest = {
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    subjects: userProfile.subjects,
    country: userProfile.country,
    ages: userProfile.ages,
    hasOptedIntoMarketing: userProfile.hasOptedIntoMarketing,
    referralCode: userProfile.referralCode,
    utm: userProfile.utm,
  };

  return axios.put(links.profile.getOriginalLink(), request).then(() => {
    AnalyticsFactory.getInstance().trackOnboardingCompleted();
    AnalyticsFactory.getInstance().createUserProfile(userProfile);
  });
}

function userCannotUpdate(links: Links) {
  return !links.profile;
}
