import axios from 'axios';
import { Links } from '../../types/Links';
import convertUserResource from './convertUserResource';
import { UserProfile } from './UserProfile';

export const fetchUser = (
  links: Links,
  userId: string,
): Promise<UserProfile> => {
  const userLink = links.profile.getTemplatedLink({ id: userId });

  return axios
    .get(userLink)
    .then(response => response.data)
    .then(convertUserResource);
};
