import { VideoFacets } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import PageSpec from './PageSpec';
import { Video } from './Video';
import { VideoCollection } from './VideoCollection';

export interface VideoSearchResult extends SearchResult {
  videos: Video[];
  facets?: VideoFacets;
  paging: PageSpec;
}

export interface CollectionSearchResult extends SearchResult {
  collections: VideoCollection[];
}

export interface SearchResult {
  query: string;
}
