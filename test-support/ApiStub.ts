import MockFetchVerify from './MockFetchVerify';
import {
  links,
  usersVideoCollection,
  video177,
  videos,
} from './video-service-responses';

export default class ApiStub {
  public links() {
    MockFetchVerify.get('/v1/', JSON.stringify(links));
    return this;
  }

  public videoQuery(query: string, tag?: string) {
    const escapedQuery = encodeURIComponent(query);
    const url = tag
      ? `/v1/videos?.*query=${escapedQuery}?.*&include_tag=${tag}`
      : `/v1/videos?.*query=${escapedQuery}`;

    MockFetchVerify.get(new RegExp(url), JSON.stringify(videos));
    return this;
  }

  public singleVideo() {
    MockFetchVerify.get(`/v1/videos/${video177.id}`, JSON.stringify(video177));
    return this;
  }

  public fetchCollection(collection: string = 'default') {
    MockFetchVerify.get(`/v1/collections/${collection}`, usersVideoCollection);
    return this;
  }

  public addToCollection(collection: string = 'default') {
    MockFetchVerify.put(
      new RegExp(`/v1/collections/${collection}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }

  public removeFromCollection(collection: string = 'default') {
    MockFetchVerify.destroy(
      new RegExp(`/v1/collections/${collection}/videos/.*`),
      JSON.stringify({}),
      204,
    );
    return this;
  }
}
