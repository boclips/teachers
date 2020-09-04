import {
  collectionResponseWithSubject,
  collectionsResponse,
  video177,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import {
  fakeSubjectsSetup,
  fakeVideoSetup,
} from '../../../test-support/fakeApiClientSetup';
import HomePage from '../../../test-support/page-objects/HomePage';

describe('Home page', () => {
  test('loads public collections', async () => {
    new ApiStub().defaultUser();

    const homePage = await HomePage.load();

    expect(homePage.getPromotedCollections()).toContainEqual({
      title: 'Promoted collection',
      subject: null,
    });
  });

  test('loads disciplines', async () => {
    new ApiStub()
      .defaultUser()
      .fetchCollections()
      .fetchDisciplines()
      .fetchCollections();

    await fakeVideoSetup(video177);

    const homePage = await HomePage.load();

    expect(homePage.getDisciplines()).toContainEqual({
      name: 'Arts',
      subjects: ['Performing Arts', 'Art History'],
    });
  });

  test('loads promoted collection and renders a single subject', async () => {
    new ApiStub()
      .defaultUser()
      .fetchPromotedCollections(
        collectionsResponse([collectionResponseWithSubject()]),
      )
      .fetchCollections();

    await fakeSubjectsSetup();

    const homePage = await HomePage.load();

    expect(homePage.getPromotedCollections()).toContainEqual({
      title: 'funky collection',
      subject: 'Maths',
    });
  });

  test('loads promoted videosSearchResponse', async () => {
    new ApiStub().defaultUser();
    await fakeVideoSetup(video177);
    const homePage = await HomePage.load();

    expect(homePage.getVideos()).toContainEqual({
      title: video177.title,
    });
  });

  test(`does not load home banner if feature is disabled`, async () => {
    new ApiStub().defaultUser({ TEACHERS_HOME_PROMOTED_COLLECTIONS: false });
    const homePage = await HomePage.load();

    expect(homePage.getPromotedCollections()).toHaveLength(0);
  });
});
