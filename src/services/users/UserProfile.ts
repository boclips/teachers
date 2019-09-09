import { Link } from '../../types/Link';
import { School } from '../../types/School';
import Utm from '../account/Utm';

export interface UserProfile {
  id: string;
  analyticsId: string;
  email: string;
  firstName: string;
  lastName: string;
  subjects?: string;
  ages?: number[];
  country?: string;
  hasOptedIntoMarketing?: boolean;
  referralCode?: string;
  utm?: Utm;
  school?: School;
  links: UserProfileLinks;
}

export interface UserProfileLinks {
  self: Link;
}
