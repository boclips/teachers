import {
  collectionResponse,
  video177Slim,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import eventually from '../../../test-support/eventually';
import { CollectionPage } from '../../../test-support/page-objects/CollectionPage';

describe('when video collection', () => {
  test('displays collection basic details', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    const collectionPage = await CollectionPage.load();

    expect(collectionPage.getCollectionDetails()).toMatchObject({
      title: 'funky collection',
      isPublic: true,
      subjects: [],
      lastUpdated: 'Jan 16, 2019',
      ageRange: '3-9',
    });
  });

  test('displays video collection with videos', async () => {
    // Given: the api returns what we say
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo();

    // When: the page is loaded
    const collectionPage = await CollectionPage.load();

    // Then: we get the right elements. We get one element.
    expect(collectionPage.isEmptyCollection()).toBeFalsy();
    expect(collectionPage.getVideos()).toHaveLength(1);
    expect(collectionPage.getVideos()[0]).toMatchObject({
      title: 'KS3/4 Science: Demonstrating Chemistry',
      description: 'Matthew Tosh shows us the science.',
      createdBy: 'cp1',
      duration: ' 1m 2s',
      releasedOn: 'Feb 11, 2018',
      badgeAlt: 'Ad free',
      subjects: ['Maths', 'Physics'],
      playerVideoId: '177',
    });
  });
});

describe('when empty collection', () => {
  test('displays beautiful illustration', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection(collectionResponse([], 'empty'));

    const collectionPage = await CollectionPage.load('empty');

    await eventually(() => {
      expect(collectionPage.isEmptyCollection()).toBeTruthy();
    });
  });
});

describe('when collection not found', () => {
  test('displays beautiful illustration', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection();

    const collectionPage = await CollectionPage.load('not-found');

    await eventually(() => {
      expect(collectionPage.isCollectionNotFound()).toBeTruthy();
    });
  });
});

describe('when editable collection', () => {
  test('can remove a video', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchVideo()
      .removeFromCollection();

    const collectionPage = await CollectionPage.load();
    expect(collectionPage.getVideos()).toHaveLength(1);

    collectionPage.removeVideo(0);

    await eventually(() => {
      expect(collectionPage.getVideos()).toHaveLength(0);
    });
  });
});

describe('when non editable collection', () => {
  test('does not render edit collection button', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchCollection(
        collectionResponse([video177Slim], 'non-editable', false),
      )
      .fetchVideo();

    const collectionPage = await CollectionPage.load('non-editable');

    expect(collectionPage.getVideos()).toHaveLength(1);
    expect(collectionPage.isEditable()).toBeFalsy();
  });
});
