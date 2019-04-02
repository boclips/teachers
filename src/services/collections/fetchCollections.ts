import axios from 'axios';
import { Links } from '../../types/Links';
import { Scrollable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import {
  parseCollectionsListResponse,
  parseScrollableCollectionsListResponse,
} from './collectionParser';

export const fetchUserCollections = (
  links: Links,
): Promise<VideoCollection[]> => {
  if (!links.myCollections) {
    return Promise.reject();
  }
  return axios
    .get(links.myCollections.getOriginalLink())
    .then(response => parseCollectionsListResponse(response));
};

export const fetchPublicCollections = (
  links: Links,
): Promise<Scrollable<VideoCollection>> => {
  if (!links.publicCollections) {
    return Promise.reject();
  }
  return axios
    .get(links.publicCollections.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

export const fetchNextPublicCollections = (
  collections: Scrollable<VideoCollection>,
): Promise<Scrollable<VideoCollection>> => {
  if (!collections.links || !collections.links.next) {
    return Promise.reject();
  }
  return axios
    .get(collections.links.next.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};
