import MockFetchVerify from './MockFetchVerify';
import {
  links,
  userCollectionResponse,
  video177,
} from './video-service-responses';

interface FetchCollectionOptions {
  collectionId: string;
  collection: any;
}

interface VideoQueryOptions {
  query: string;
  tag?: string;
  results: any;
}

interface CollectionOptions {
  name: string;
}

interface SingleVideoOptions {
  video: any;
}

export default class ApiStub {
  constructor() {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
  }

  public queryVideos(options: VideoQueryOptions) {
    const escapedQuery = encodeURIComponent(options.query);
    const url = options.tag
      ? `/v1/videos?.*query=${escapedQuery}?.*&include_tag=${options.tag}`
      : `/v1/videos?.*query=${escapedQuery}`;

    MockFetchVerify.get(new RegExp(url), JSON.stringify(options.results));
    return this;
  }

  public fetchVideo(options: SingleVideoOptions) {
    MockFetchVerify.get(
      `/v1/videos/${options.video.id}`,
      JSON.stringify(options.video),
    );
    return this;
  }

  public fetchCollection(options: Partial<FetchCollectionOptions> = {}) {
    const collectionName = options.collectionId || 'default';
    const collection = options.collection || userCollectionResponse([video177]);

    MockFetchVerify.get(`/v1/collections/${collectionName}`, collection);
    return this;
  }

  public fetchCollections(collection) {
    MockFetchVerify.get('/v1/collections', collection);
    return this;
  }

  public addToCollection(options: CollectionOptions = { name: 'default' }) {
    MockFetchVerify.put(
      new RegExp(`/v1/collections/${options.name}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public removeFromCollection(
    options: CollectionOptions = { name: 'default' },
  ) {
    MockFetchVerify.destroy(
      new RegExp(`/v1/collections/${options.name}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }
}
