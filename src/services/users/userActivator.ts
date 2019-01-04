import axios from 'axios';
import { Links } from '../../types/Links';
import { EventTypes } from '../analytics/Analytics';
import AnalyticsFactory from '../analytics/AnalyticsFactory';

export default function activateUser(links: Links) {
  const analytics = AnalyticsFactory.getInstance();

  if (!links.activate) {
    return;
  }

  axios.post(links.activate.getOriginalLink()).then(() => {
    analytics.publish(EventTypes.ACTIVATION_COMPLETE);
  });
}
