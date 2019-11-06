import {
  collectionsResponse,
  video177,
  videosResponse,
} from '../../../test-support/api-responses';
import ApiStub from '../../../test-support/ApiStub';
import { VideoResourceFactory } from '../../../test-support/factories';
import { HomePage } from '../../../test-support/page-objects/HomePage';

describe('Home page', () => {
  test('loads public collections', async () => {
    let homePage: HomePage;

    new ApiStub()
      .defaultUser()
      .fetchVideo()
      .queryVideos({
        results: videosResponse([
          VideoResourceFactory.sample({ title: 'hello', promoted: true }),
        ]),
        promoted: true,
      })
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
      .queryVideos({
        results: videosResponse([
          VideoResourceFactory.sample({ title: 'hello', promoted: true }),
        ]),
        promoted: true,
      })
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
      .queryVideos({
        results: videosResponse([
          VideoResourceFactory.sample({ title: 'hello', promoted: true }),
        ]),
        promoted: true,
      })
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

  test('loads promoted videos', async () => {
    let homePage: HomePage;

    new ApiStub()
      .defaultUser()
      .queryVideos({
        results: videosResponse([
          VideoResourceFactory.sample({ title: 'hello', promoted: true }),
        ]),
        promoted: true,
      })
      .fetchVideo()
      .fetchPublicCollections(
        collectionsResponse(
          [video177],
          [{ id: '1', name: null }, { id: '2', name: null }],
        ),
      )
      .fetchCollections();

    homePage = await HomePage.load();

    expect(homePage.getVideos()).toContainEqual({
      title: 'hello',
    });
  });
});
