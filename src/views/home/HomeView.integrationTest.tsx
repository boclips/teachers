import {
  collectionResponseWithSubject,
  collectionsResponse,
  videosResponse,
} from 'test-support/api-responses';
import ApiStub from 'test-support/ApiStub';
import { VideoResourceFactory } from 'test-support/factories';
import { fakeSubjectsSetup } from 'test-support/fakeApiClientSetup';
import { HomePage } from 'test-support/page-objects/HomePage';

describe('Home page', () => {
  test('loads public collections', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted()
      .fetchPublicCollections()
      .fetchCollections();

    const homePage = await HomePage.load();

    expect(homePage.getPublicCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
      subject: null,
    });
  });

  test('loads disciplines', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted()
      .fetchPublicCollections()
      .fetchDisciplines()
      .fetchCollections();

    const homePage = await HomePage.load();

    expect(homePage.getDisciplines()).toContainEqual({
      name: 'Arts',
      subjects: ['Art History', 'Performing Arts'],
    });
  });

  test('loads public collection and renders a single subject', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted()
      .fetchPublicCollections(
        collectionsResponse([collectionResponseWithSubject()]),
      )
      .fetchCollections();

    await fakeSubjectsSetup();

    const homePage = await HomePage.load();

    expect(homePage.getPublicCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
      subject: 'Maths',
    });
  });

  test('loads promoted videos', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPublicCollections()
      .fetchCollections()
      .fetchPromoted(
        videosResponse([
          VideoResourceFactory.sample({ title: 'hello', promoted: true }),
        ]),
      );

    const homePage = await HomePage.load();

    expect(homePage.getVideos()).toContainEqual({
      title: 'hello',
    });
  });
});
