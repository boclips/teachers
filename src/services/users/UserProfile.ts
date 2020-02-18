import { Country } from 'src/types/Country';
import { Link } from 'src/types/Link';
import { School } from 'src/types/School';
import { UsaState } from 'src/types/UsaState';
import Utm from '../account/Utm';

export interface UserProfile {
  id: string;
  analyticsId: string;
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
}

export interface UserProfileLinks {
  self: Link;
}
