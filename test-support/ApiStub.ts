import {
  collectionResponse,
  collectionsResponse,
  disciplinesResponse,
  links,
  subjectsResponse,
  tagsResponse,
  userResponse,
  video177,
  video177Slim,
} from './api-responses';
import MockFetchVerify from './MockFetchVerify';

interface VideoQueryOptions {
  query: string;
  tag?: string;
  subject?: string[];
  age_range_min?: number;
  age_range_max?: number;
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
  private readonly prefix: string = 'https://api.example.com';

  constructor(linksDefault: any = links) {
    MockFetchVerify.clear();
    MockFetchVerify.get(`${this.prefix}/v1/`, JSON.stringify(linksDefault));
    this.fetchSubjects()
      .fetchCollections()
      .fetchDisciplines()
      .fetchTags();
  }

  public queryVideos(options: VideoQueryOptions) {
    const escapedQuery = encodeURIComponent(options.query);
    let url = `/v1/videos?.*query=${escapedQuery}`;
    url += options.tag ? `?.*&include_tag=${options.tag}` : '';
    url += options.subject ? `?.*&subject=${options.subject.join(',')}` : '';
    url += options.age_range_min
      ? `?.*&age_range_min=${options.age_range_min}`
      : '';
    url += options.age_range_max
      ? `?.*&age_range_max=${options.age_range_max}`
      : '';

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
      `${this.prefix}/v1/videos/${options.video.id}`,
      JSON.stringify(options.video),
    );
    return this;
  }

  public fetchSubjects() {
    MockFetchVerify.get(
      `${this.prefix}/v1/subjects`,
      JSON.stringify(subjectsResponse()),
    );
    return this;
  }

  public fetchDisciplines() {
    MockFetchVerify.get(
      `${this.prefix}/v1/disciplines`,
      JSON.stringify(disciplinesResponse()),
    );
    return this;
  }

  public fetchTags() {
    MockFetchVerify.get(
      `${this.prefix}/v1/tags`,
      JSON.stringify(tagsResponse()),
    );
    return this;
  }

  public fetchCollections(
    collectionsList = collectionsResponse([video177Slim]),
    once = false,
  ) {
    if (once) {
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections?projection=list&owner=me`,
        collectionsList,
      );
    } else {
      MockFetchVerify.get(
        `${this.prefix}/v1/collections?projection=list&owner=me`,
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
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections?public=true`,
        collections,
      );
    } else {
      MockFetchVerify.get(
        `${this.prefix}/v1/collections?public=true`,
        collections,
      );
    }
    return this;
  }

  public fetchCollectionsBySubjects(...subjectIds: string[]) {
    MockFetchVerify.get(
      `${this.prefix}/v1/collections?subject=${subjectIds.join(',')}`,
      collectionsResponse(),
    );
    return this;
  }

  public fetchBookmarkedCollections(collections = collectionsResponse()) {
    MockFetchVerify.getOnce(
      `${this.prefix}/v1/collections?bookmarked=true`,
      collections,
    );
    return this;
  }

  public fetchCollection(collection = collectionResponse(), once = false) {
    if (once) {
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections/${collection.id}`,
        collection,
      );
    } else {
      MockFetchVerify.get(
        `${this.prefix}/v1/collections/${collection.id}`,
        collection,
      );
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
      `${this.prefix}/v1/collections/${collectionOptions.collectionId}`,
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public fetchUser(user: any) {
    MockFetchVerify.get(`${this.prefix}/v1/users/${user.id}`, user);
    return this;
  }

  public defaultUser() {
    this.fetchUser(userResponse());
    return this;
  }
}
