import MockFetchVerify from './MockFetchVerify';
import {
  collectionResponse,
  collectionsResponse,
  links,
  subjectsResponse,
  userResponse,
  video177,
  video177Slim,
} from './video-service-responses';

interface VideoQueryOptions {
  query: string;
  tag?: string;
  results: any;
}

interface CollectionQueryOptions {
  query: string;
  results: any;
}

interface CollectionOptions {
  collectionId: string;
}

interface SingleVideoOptions {
  video: any;
}

export default class ApiStub {
  constructor(linksDefault: any = links) {
    MockFetchVerify.get('/v1/', JSON.stringify(linksDefault));
    this.fetchSubjects();
  }

  public queryVideos(options: VideoQueryOptions) {
    const escapedQuery = encodeURIComponent(options.query);
    const url = options.tag
      ? `/v1/videos?.*query=${escapedQuery}?.*&include_tag=${options.tag}`
      : `/v1/videos?.*query=${escapedQuery}`;

    MockFetchVerify.get(new RegExp(url), JSON.stringify(options.results));
    return this;
  }

  public queryCollections(options: CollectionQueryOptions) {
    const escapedQuery = encodeURIComponent(options.query);
    const url = `/v1/collections?.*query=${escapedQuery}`;

    MockFetchVerify.get(new RegExp(url), JSON.stringify(options.results));
    return this;
  }

  public fetchVideo(options: SingleVideoOptions = { video: video177 }) {
    MockFetchVerify.get(
      `/v1/videos/${options.video.id}`,
      JSON.stringify(options.video),
    );
    return this;
  }

  public fetchSubjects() {
    MockFetchVerify.get(`/v1/subjects`, JSON.stringify(subjectsResponse()));
    return this;
  }

  public fetchCollections(
    collectionsList = collectionsResponse([video177Slim]),
    once = false,
  ) {
    if (once) {
      MockFetchVerify.getOnce(
        '/v1/collections?projection=list&owner=me',
        collectionsList,
      );
    } else {
      MockFetchVerify.get(
        '/v1/collections?projection=list&owner=me',
        collectionsList,
      );
    }
    return this;
  }

  public fetchPublicCollections(
    collections = collectionsResponse(),
    once = false,
  ) {
    if (once) {
      MockFetchVerify.getOnce('/v1/collections?public=true', collections);
    } else {
      MockFetchVerify.get('/v1/collections?public=true', collections);
    }
    return this;
  }

  public fetchBookmarkedCollections(collections = collectionsResponse()) {
    MockFetchVerify.getOnce('/v1/collections?bookmarked=true', collections);
    return this;
  }

  public fetchCollection(collection = collectionResponse(), once = false) {
    if (once) {
      MockFetchVerify.getOnce(`/v1/collections/${collection.id}`, collection);
    } else {
      MockFetchVerify.get(`/v1/collections/${collection.id}`, collection);
    }
    return this;
  }

  public addToCollection(options: CollectionOptions = { collectionId: 'id' }) {
    MockFetchVerify.put(
      new RegExp(`/v1/collections/${options.collectionId}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public removeFromCollection(
    options: CollectionOptions = { collectionId: 'id' },
  ) {
    MockFetchVerify.delete(
      new RegExp(`/v1/collections/${options.collectionId}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public deleteCollection(
    collectionOptions: CollectionOptions = { collectionId: 'id' },
  ) {
    MockFetchVerify.delete(
      `/v1/collections/${collectionOptions.collectionId}`,
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public fetchUser(user: any) {
    MockFetchVerify.get(`/v1/users/${user.id}`, user);
    return this;
  }

  public defaultUser() {
    this.fetchUser(userResponse('my-user-id'));
    return this;
  }
}
