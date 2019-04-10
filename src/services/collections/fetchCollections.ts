import axios from 'axios';
import { Links } from '../../types/Links';
import { Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import {
  parseCollectionsListResponse,
  parseScrollableCollectionsListResponse,
} from './collectionParser';

export const fetchMyCollections = (
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
): Promise<Pageable<VideoCollection>> => {
  if (!links.publicCollections) {
    return Promise.reject();
  }
  return axios
    .get(links.publicCollections.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

export const fetchBookmarkedCollections = (
  links: Links,
): Promise<Pageable<VideoCollection>> => {
  if (!links.bookmarkedCollections) {
    return Promise.reject();
  }
  return axios
    .get(links.bookmarkedCollections.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};

export const fetchNextCollectionsPage = (
  collections: Pageable<VideoCollection>,
): Promise<Pageable<VideoCollection>> => {
  if (!collections.links || !collections.links.next) {
    return Promise.reject();
  }
  return axios
    .get(collections.links.next.getOriginalLink())
    .then(response => parseScrollableCollectionsListResponse(response));
};
