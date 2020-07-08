import MockFetchVerify from './MockFetchVerify';
import {
  collectionResponse,
  collectionsResponse,
  countriesResponse,
  disciplinesResponse,
  links,
  promotedCollectionsResponse,
  schoolsResponse,
  tagsResponse,
  userResponse,
} from './api-responses';

interface CollectionQueryOptions {
  query: string;
  results: any;
}

interface CollectionOptions {
  collectionId: string;
}

export default class ApiStub {
  public constructor(
    linksDefault: any = links,
    private prefix: string = 'https://api.example.com',
  ) {
    MockFetchVerify.clear();
    MockFetchVerify.get(`${this.prefix}/v1/`, JSON.stringify(linksDefault));
    this.fetchCountries()
      .fetchCollections()
      .fetchPromotedCollections()
      .fetchDisciplines()
      .fetchTags();
  }

  public queryCollections(options: CollectionQueryOptions) {
    const escapedQuery = encodeURIComponent(options.query);
    const url = `/v1/collections?.*query=${escapedQuery}`;

    MockFetchVerify.get(new RegExp(url), JSON.stringify(options.results));
    return this;
  }

  public fetchCountries() {
    MockFetchVerify.get(
      `${this.prefix}/v1/countries`,
      JSON.stringify(countriesResponse()),
    );
    return this;
  }

  public fetchSchools(countryCode = 'ES', query = 'school') {
    MockFetchVerify.get(
      `${this.prefix}/v1/schools?countryCode=${countryCode}&query=${query}`,
      JSON.stringify(schoolsResponse()),
    );
    return this;
  }

  public fetchAmericanSchools(query = 'school', state = 'CA') {
    MockFetchVerify.get(
      `${this.prefix}/v1/schools?countryCode=USA&query=${query}&state=${state}`,
      JSON.stringify(schoolsResponse()),
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
    collectionsList = collectionsResponse(),
    once = false,
  ) {
    if (once) {
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections?projection=list&owner=me`,
        collectionsList,
      );
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections?projection=list&page=0&size=30&owner=me&bookmarked=true&sort_by=TITLE`,
        collectionsList,
      );
      MockFetchVerify.getOnce(
        `${this.prefix}/v1/collections?discoverable=true`,
        collectionsList,
      );
    } else {
      MockFetchVerify.get(
        `${this.prefix}/v1/collections?projection=list&owner=me`,
        collectionsList,
      );
      MockFetchVerify.get(
        `${this.prefix}/v1/collections?projection=list&page=0&size=30&owner=me&bookmarked=true&sort_by=TITLE`,
        collectionsList,
      );
      MockFetchVerify.get(
        `${this.prefix}/v1/collections?discoverable=true`,
        collectionsList,
      );
    }

    return this;
  }

  public fetchPromotedCollections(collections = promotedCollectionsResponse()) {
    MockFetchVerify.get(
      `${this.prefix}/v1/collections?promoted=true`,
      collections,
    );
    return this;
  }

  public fetchCollectionsBySubjects(...subjectIds: string[]) {
    MockFetchVerify.get(
      `${this.prefix}/v1/collections?subject=${subjectIds.join(',')}`,
      collectionsResponse(),
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

  public fetchUser(user: any) {
    MockFetchVerify.get(`${this.prefix}/v1/users/${user.id}`, user);
    return this;
  }

  public defaultUser() {
    this.fetchUser(userResponse());
    return this;
  }
}
