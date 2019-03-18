import axios from 'axios';
import { Links } from '../../types/Links';
import { VideoCollection } from '../../types/VideoCollection';
import { parseCollectionsListResponse } from './collectionParser';

export const fetchUserCollections = (
  links: Links,
): Promise<VideoCollection[]> => {
  if (!links.userCollectionsList) {
    return Promise.reject();
  }
  return axios
    .get(links.userCollectionsList.getOriginalLink())
    .then(response => parseCollectionsListResponse(response));
};

export const fetchPublicCollections = (
  links: Links,
): Promise<VideoCollection[]> => {
  if (!links.userCollectionsList) {
    return Promise.reject();
  }
  return axios
    .get(links.userCollectionsList.getOriginalLink())
    .then(response => parseCollectionsListResponse(response));
};
