import {
  collectionResponseWithSubject,
  collectionsResponse,
  buildVideoSearchResponse,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import { VideoResourceFactory } from '../../../test-support/factories';
import { fakeSubjectsSetup } from '../../../test-support/fakeApiClientSetup';
import { HomePage } from '../../../test-support/page-objects/HomePage';

describe('Home page', () => {
  test('loads public collections', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted();

    const homePage = await HomePage.load();

    expect(homePage.getPromotedCollections()).toContainEqual({
      title: 'Promoted collection',
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
      subjects: ['Performing Arts', 'Art History'],
    });
  });

  test('loads promoted collection and renders a single subject', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted()
      .fetchPromotedCollections(
        collectionsResponse([collectionResponseWithSubject()]),
      )
      .fetchCollections();

    await fakeSubjectsSetup();

    const homePage = await HomePage.load();

    expect(homePage.getPromotedCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
      subject: 'Maths',
    });
  });

  test('loads promoted videosSearchResponse', async () => {
    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPromoted(
        buildVideoSearchResponse([
          VideoResourceFactory.sample({
            id: 'some-other-id',
            title: 'hello',
            promoted: true,
          }),
        ]),
      );

    const homePage = await HomePage.load();

    expect(homePage.getVideos()).toContainEqual({
      title: 'hello',
    });
  });
});
