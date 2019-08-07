import ApiStub from '../../../test-support/ApiStub';
import { HomePage } from '../../../test-support/page-objects/HomePage';
import {
  collectionsResponse,
  video177,
} from '../../../test-support/video-service-responses';

describe('Home page', () => {
  test('loads public collections', async () => {
    let homePage: HomePage;

    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPublicCollections()
      .fetchCollections();

    homePage = await HomePage.load();

    expect(homePage.getPublicCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
      subject: null,
    });
  });

  test('loads disciplines', async () => {
    let homePage: HomePage;

    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPublicCollections()
      .fetchDisciplines()
      .fetchCollections();

    homePage = await HomePage.load();

    expect(homePage.getDisciplines()).toContainEqual({
      name: 'Arts',
      subjects: ['Art History', 'Performing Arts'],
    });
  });

  test('loads public collection and renders a single subject', async () => {
    let homePage: HomePage;

    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .fetchPublicCollections(
        collectionsResponse(
          [video177],
          [{ id: '1', name: null }, { id: '2', name: null }],
        ),
      )
      .fetchCollections();

    homePage = await HomePage.load();

    expect(homePage.getPublicCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
      subject: 'Maths',
    });
  });
});
