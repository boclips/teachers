import axios from 'axios';
import { Links } from '../../types/Links';
import { EventTypes } from '../analytics/Analytics';
import AnalyticsFactory from '../analytics/AnalyticsFactory';
import { UserProfile } from '../analytics/MixpanelAnalytics';

export default function activateUser(links: Links, userProfile: UserProfile) {
  const analytics = AnalyticsFactory.getInstance();

  if (userCannotActivate(links)) {
    return;
  }

  axios.post(links.activate.getOriginalLink()).then(() => {
    analytics.publish(EventTypes.ACTIVATION_COMPLETE);
    analytics.createUserProfile(userProfile);
  });
}

function userCannotActivate(links: Links) {
  return !links.activate;
}
