import { within, fireEvent } from '@testing-library/react';
import {
  renderSearchResultsView,
  renderSearchResultsViewWithSampleData,
} from 'test-support/views/searchResultsViewRender';
import ApiStub from 'test-support/ApiStub';
import {
  collectionsResponse,
  videosResponse,
} from 'test-support/api-responses';
import { waitForElement } from '@testing-library/react';

describe('SearchResultsView', () => {
  it('panel contains filters for age, subjects and duration', () => {
    const view = renderSearchResultsViewWithSampleData();
    const sidebar = view.getByText('Filter results').closest('div');

    expect(sidebar).toBeInTheDocument();
    expect(within(sidebar).getByText('Age')).toBeInTheDocument();
    expect(within(sidebar).getByText('Subjects')).toBeInTheDocument();
    expect(within(sidebar).getByText('Duration')).toBeInTheDocument();
  });

  it(`can change subject filters`, async () => {
    const { findByLabelText } = renderSearchResultsViewWithSampleData();

    const artsCheckbox = await findByLabelText('Arts');

    expect(artsCheckbox.closest('input').checked).toEqual(false);
    await fireEvent.click(artsCheckbox);
    expect(artsCheckbox.closest('input').checked).toEqual(true);
  });

  describe('no results found', () => {
    const helperMessageTitle =
      'Oops, we couldn’t find any results that matched your search for';

    const helperMessageDetails =
      "We'll look into why we couldn't find any videos matching your search but in the meantime have a look at our tips to improve your search results:";

    const helperMessageFiltersTip =
      'Remove filters to expand the scope of your search.';

    const helperMessageOtherTip =
      'Check the spelling of your search term for any typos.';

    it(`renders helper message and filter bar if any filters selected`, async () => {
      const initialQuery = 'hello';
      const view = renderSearchResultsViewWithSampleData(initialQuery);
      await waitForElement(() => view.getByText('result(s) found'));

      new ApiStub()
        .defaultUser()
        .queryVideos({
          query: initialQuery,
          subject: ['art-id'],
          results: videosResponse([]),
        })
        .queryCollections({
          query: initialQuery,
          results: collectionsResponse([]),
        });

      const artsOption = await view.findByLabelText('Arts');
      fireEvent.click(artsOption);

      await waitForElement(() => view.getByText(helperMessageTitle));
      expect(view.getByText(helperMessageTitle)).toBeInTheDocument();
      expect(view.getByText(helperMessageDetails)).toBeInTheDocument();
      expect(view.getByText(helperMessageFiltersTip)).toBeInTheDocument();
      expect(view.getByText(helperMessageOtherTip)).toBeInTheDocument();
      expect(view.getByText('Filter results')).toBeInTheDocument();
      expect(view.queryByTestId('no-results-image')).not.toBeInTheDocument();
    }, 10000);

    it('renders helper message with image and no filters bar', async () => {
      const initialQuery = 'hello';

      new ApiStub()
        .defaultUser()
        .queryVideos({ query: initialQuery, results: videosResponse([]) })
        .queryCollections({
          query: initialQuery,
          results: collectionsResponse([]),
        });

      const view = renderSearchResultsView(initialQuery);

      expect(await view.findByText(helperMessageTitle)).toBeInTheDocument();
      expect(view.getByText(helperMessageDetails)).toBeInTheDocument();
      expect(view.getByText(helperMessageOtherTip)).toBeInTheDocument();
      expect(view.getByTestId('no-results-image')).toBeInTheDocument();

      expect(view.queryByText(helperMessageFiltersTip)).not.toBeInTheDocument();
      expect(view.queryByText('Filter results')).not.toBeInTheDocument();
    });
  });
});
