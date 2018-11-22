import { HomeViewPage } from './HomeViewPage';
import { SearchPage } from './search-videos/SearchResultsView.integrationTest';

test('search for a video goes to search page with results', async () => {
  const homeView = await HomeViewPage.mount();
  const searchPage = new SearchPage(homeView.wrapper);

  homeView.search('some video');

  await searchPage.hasLoaded();
});
