import { Country } from '../../types/Country';
import { Link } from '../../types/Link';
import { School } from '../../types/School';
import { UsaState } from '../../types/UsaState';
import Utm from '../account/Utm';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  shareCode: string;
  subjects?: string[];
  ages?: number[];
  country?: Country;
  state?: UsaState;
  hasOptedIntoMarketing?: boolean;
  referralCode?: string;
  utm?: Utm;
  school?: School;
  links: UserProfileLinks;
  features: { [key in UserFeatureKey]?: boolean };
  role: 'TEACHER' | 'PARENT' | 'SCHOOLADMIN' | 'OTHER';
}

export type UserFeatureKey = 'USER_DATA_HIDDEN';

export interface UserProfileLinks {
  self: Link;
}
