import PageSpec from './PageSpec';
import { Video } from './Video';
import { VideoCollection } from './VideoCollection';

export interface VideoSearchResults {
  query: string;
  videos: Video[];
  paging: PageSpec;
}

export interface CollectionsSearchResult {
  query: string;
  collections: VideoCollection[];
}
