import ApiStub from '../../../test-support/ApiStub';
import { HomePage } from '../../../test-support/page-objects/HomePage';

describe('Home page', () => {
  let homePage: HomePage;

  beforeEach(async () => {
    new ApiStub()
      .fetchVideo()
      .fetchPublicCollections()
      .fetchCollections();

    homePage = await HomePage.load();
  });

  test('loads public collections', () => {
    expect(homePage.getPublicCollections()).toContainEqual({
      title: 'funky collection',
      numberOfVideos: 1,
    });
  });
});
