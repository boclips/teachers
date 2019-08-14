import { Link } from '../../types/Link';

export interface UserProfile {
  id: string;
  analyticsId: string;
  email: string;
  firstName: string;
  lastName: string;
  links: UserProfileLinks;
}

export interface UserProfileLinks {
  self: Link;
}
