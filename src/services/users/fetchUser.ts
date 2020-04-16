import axios from 'axios';
import { Links } from '../../types/Links';
import convertUserResource from './convertUserResource';
import { UserProfile } from './UserProfile';

export const fetchUser = (links: Links): Promise<UserProfile> => {
  const userLink = links.profile.getOriginalLink();

  return axios
    .get(userLink)
    .then((response) => response.data)
    .then(convertUserResource);
};
