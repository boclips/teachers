import { Link } from './Link';

export interface Links {
  videos?: Link;
  video: Link;
  createPlaybackEvent: Link;
  createNoSearchResultsEvent: Link;
  collection?: Link;
  collections?: Link;
  userCollectionsList?: Link;
  publicCollections?: Link;
  activate?: Link;
  profile?: Link;
}
