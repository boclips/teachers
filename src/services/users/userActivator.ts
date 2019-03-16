import axios from 'axios';
import { Links } from '../../types/Links';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { UserProfile } from '../analytics/UserProfile';

export default function activateUser(
  links: Links,
  userProfile: UserProfile,
): Promise<void> {
  if (userCannotActivate(links)) {
    return;
  }

  return axios.post(links.activate.getOriginalLink()).then(() => {
    AnalyticsFactory.getInstance().trackAccountActivation();
    AnalyticsFactory.getInstance().createUserProfile(userProfile);
  });
}

function userCannotActivate(links: Links) {
  return !links.activate;
}
