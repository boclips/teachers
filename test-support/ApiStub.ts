import MockFetchVerify from './MockFetchVerify';
import {
  links,
  userCollectionsResponse,
  video177Slim,
} from './video-service-responses';

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

  public fetchCollections(
    collections = userCollectionsResponse(),
    collectionsList = userCollectionsResponse([video177Slim]),
    once = false,
  ) {
    if (once) {
      MockFetchVerify.getOnce(
        '/v1/collections?projection=details',
        collections,
      );

      MockFetchVerify.getOnce(
        '/v1/collections?projection=list',
        collectionsList,
      );
    } else {
      MockFetchVerify.get('/v1/collections?projection=details', collections);

      MockFetchVerify.get('/v1/collections?projection=list', collectionsList);
    }
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
    MockFetchVerify.delete(
      new RegExp(`/v1/collections/${options.name}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public deleteCollection(url: string) {
    MockFetchVerify.delete(url, JSON.stringify({}), 204);
    return this;
  }
}
