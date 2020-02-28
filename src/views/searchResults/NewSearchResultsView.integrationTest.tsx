import React from 'react';
import { within, fireEvent } from '@testing-library/react';
import { renderWithStore } from 'test-support/renderWithStore';
import {
  LinksStateValueFactory,
  RouterFactory,
  SearchFactory,
  SubjectsFactory,
  UserProfileFactory,
} from 'test-support/factories';
import {
  renderSearchResultsView,
  renderSearchResultsViewWithSampleData,
} from 'test-support/views/searchResultsViewRender';
import ApiStub from 'test-support/ApiStub';
import {
  collectionsResponse,
  videosResponse,
} from 'test-support/api-responses';
import { ConnectedNewSearchResultsView } from './NewSearchResultsView';

describe('SearchResultsView', () => {
  it('Filter panel is visible', () => {
    const view = renderWithStore(<ConnectedNewSearchResultsView />, {
      initialState: {
        subjects: SubjectsFactory.sample(),
        search: SearchFactory.sample(),
        router: RouterFactory.sample(),
        user: UserProfileFactory.sample(),
        links: LinksStateValueFactory.sample(),
      },
    });
    const sidebar = view.getByText('Filter results').closest('div');

    expect(sidebar).toBeInTheDocument();
    expect(within(sidebar).getByText('Age')).toBeInTheDocument();
    expect(within(sidebar).getByText('Subjects')).toBeInTheDocument();
    expect(within(sidebar).getByText('Duration')).toBeInTheDocument();
  });

  it(`changing the filters triggers a new search`, async () => {
    const {
      findByText,
      getByTestId,
      findByTestId,
    } = renderSearchResultsViewWithSampleData();

    const subjectsInput = await findByText('Choose from our list..');
    await fireEvent.click(subjectsInput);

    const artsOption = await findByText('Arts');
    await fireEvent.click(artsOption);

    await findByTestId('subject-filter-tag');

    expect(getByTestId('subject-filter-tag')).toBeInTheDocument();
  });

  describe('no results found', () => {
    const helperMessageTitle =
      'Oops, we couldn’t find any results that matched your search for';

    const helperMessageDetails =
      "We'll look into why we couldn't find any videos matching your search but in the meantime have a look at our tips to improve your search results:";
    const helperMessageFiltersTip =
      'Remove filters to expand the scope of your search.';

    it(`renders helper message and filter bar if any filters selected`, async () => {
      const initialQuery = 'hello';

      new ApiStub()
        .defaultUser()
        .queryVideos({ query: initialQuery, results: videosResponse([]) })
        .queryCollections({
          query: initialQuery,
          results: collectionsResponse([]),
        });

      const view = renderSearchResultsView(initialQuery);

      const subjectsInput = await view.findByText('Choose from our list..');
      fireEvent.click(subjectsInput);

      const artsOption = await view.findByText('Arts');
      fireEvent.click(artsOption);

      expect(await view.findByText(helperMessageTitle)).toBeInTheDocument();
      expect(view.getByText(helperMessageDetails)).toBeInTheDocument();
      expect(view.getByText(helperMessageFiltersTip)).toBeInTheDocument();
      expect(view.getByText('Filter results')).toBeInTheDocument();
    });
  });
});
