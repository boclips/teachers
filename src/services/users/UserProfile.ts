import { Link } from '../../types/Link';

export interface UserProfile {
  id: string;
  analyticsId: string;
  email: string;
  firstName: string;
  lastName: string;
  subjects?: string;
  ages?: number[];
  hasOptedIntoMarketing?: boolean;
  links: UserProfileLinks;
}

export interface UserProfileLinks {
  self: Link;
}
