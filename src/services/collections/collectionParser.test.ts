import {
  collectionResponse,
  collectionResponseWithAttachment,
  collectionResponseWithSubject,
  parentCollectionResponse,
  video177,
  video177Slim,
  youtubeVideo1,
} from '../../../test-support/api-responses';
import { Link } from '../../types/Link';
import { Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import {
  parseCollectionResponse,
  parseCollectionsListResponse,
  parseScrollableCollectionsListResponse,
} from './collectionParser';

describe('parsing a single collections API response', () => {
  it('parses common properties', () => {
    const data = collectionResponse();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.id).toEqual('id');
    expect(parsed.title).toEqual('funky collection');
    expect(parsed.updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(parsed.createdBy).toEqual('AI');
    expect(parsed.discoverable).toEqual(true);
  });

  it('parses edit links', () => {
    const data = collectionResponse();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.links.edit).toBeTruthy();
    expect(parsed.links.edit.getOriginalLink()).toEqual(
      'https://api.example.com/v1/collections/id',
    );

    expect(parsed.links.addVideo).toBeTruthy();
    expect(parsed.links.addVideo.getOriginalLink()).toEqual(
      'https://api.example.com/v1/collections/id/videos/{video_id}',
    );

    expect(parsed.links.remove).toBeTruthy();
    expect(parsed.links.remove.getOriginalLink()).toEqual(
      'https://api.example.com/v1/collections/id',
    );

    expect(parsed.links.removeVideo).toBeTruthy();
    expect(parsed.links.removeVideo.getOriginalLink()).toEqual(
      'https://api.example.com/v1/collections/id/videos/{video_id}',
    );
  });

  it('parses non-edit links', () => {
    const data = collectionResponse();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.links.interactedWith.getOriginalLink()).toEqual(
      'https://api.example.com/v1/collections/id/events',
    );
  });

  it('parses videos', () => {
    const data = collectionResponse();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.videoIds).toEqual([
      {
        value: '177',
        links: {
          self: new Link({ href: 'https://api.example.com/v1/videos/177' }),
        },
      },
    ]);
  });

  it('parses a collection with subjects', () => {
    const data = collectionResponseWithSubject();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.subjects).toEqual(['1', '2']);
  });

  it('parses a collection with attachments', () => {
    const data = collectionResponseWithAttachment();

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.attachments).toEqual([
      {
        id: 'attachment-id-1',
        type: 'LESSON_PLAN',
        description: 'Attachment Description',
        links: {
          download: new Link({ href: 'https://example.com/download' }),
        },
      },
    ]);
  });

  it('parses a collection with subCollections', () => {
    const data = parentCollectionResponse('Parent-collection', false, [
      collectionResponse([video177Slim], 'child-1'),
      collectionResponse([video177Slim], 'child-2'),
    ]);

    const parsed: VideoCollection = parseCollectionResponse({ data });

    expect(parsed.id).toEqual('Parent-collection');
    expect(parsed.title).toEqual('parent collection');
    expect(parsed.updatedAt).toEqual('2019-01-16T12:00:00.870Z');
    expect(parsed.createdBy).toEqual('AI');
    expect(parsed.discoverable).toEqual(true);
    expect(parsed.subCollections.length).toEqual(2);
    expect(parsed.subCollections[0].id).toEqual('child-1');
    expect(parsed.subCollections[1].id).toEqual('child-2');
  });
});

describe('parsing a pageable list of collections', () => {
  let parsed: Pageable<VideoCollection> = null;

  beforeEach(() => {
    const collectionOne = collectionResponse([video177], '1');
    const collectionTwo = collectionResponse([youtubeVideo1], '2');

    parsed = parseScrollableCollectionsListResponse({
      data: {
        _embedded: {
          collections: [collectionOne, collectionTwo],
        },
        _links: {
          next: {
            href: 'v1/collections?page=2',
          },
        },
      },
    });
  });

  it('provides the next page link', () => {
    expect(parsed.links.next).toBeTruthy();
    expect(parsed.links.next.getOriginalLink()).toEqual(
      'v1/collections?page=2',
    );
  });

  it('parses each of the collections in the data', () => {
    expect(parsed.items[0].id).toEqual('1');
    expect(parsed.items[1].id).toEqual('2');
  });
});

describe('parsing a list of collections', () => {
  let parsed: VideoCollection[] = null;

  beforeEach(() => {
    const collectionOne = collectionResponse([video177], '1');
    const collectionTwo = collectionResponse([youtubeVideo1], '2');

    parsed = parseCollectionsListResponse({
      data: {
        _embedded: {
          collections: [collectionOne, collectionTwo],
        },
      },
    });
  });

  it('parses each of the collections in the data', () => {
    expect(parsed[0].id).toEqual('1');
    expect(parsed[1].id).toEqual('2');
  });
});
