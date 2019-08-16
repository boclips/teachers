import axios from 'axios';
import { Links } from '../../types/Links';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { UserProfile } from './UserProfile';

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  subjects: string;
  ages: number[];
  hasOptedIntoMarketing: boolean;
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
    ages: userProfile.ages,
    hasOptedIntoMarketing: userProfile.hasOptedIntoMarketing,
  };

  return axios.put(links.profile.getOriginalLink(), request).then(() => {
    AnalyticsFactory.getInstance().trackAccountActivation();
    AnalyticsFactory.getInstance().createUserProfile(userProfile);
  });
}

function userCannotUpdate(links: Links) {
  return !links.profile;
}
