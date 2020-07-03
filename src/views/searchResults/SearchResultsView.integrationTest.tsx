import { fireEvent } from '@testing-library/react';
import {
  renderSearchResultsView,
  renderSearchResultsViewWithSampleData,
} from 'test-support/views/searchResultsViewRender';
import ApiStub from 'test-support/ApiStub';
import {
  collectionsResponse,
  buildVideoSearchResponse,
  video177,
} from 'test-support/api-responses';

describe('SearchResultsView', () => {
  it('panel contains filters for age, subjects, duration, and resource type', async () => {
    const view = renderSearchResultsViewWithSampleData();
    const sidebar = view.getByText('Filter results').closest('div');

    expect(sidebar).toBeInTheDocument();

    await view.findByLabelText(/Arts.*/);

    expect(view.getByText('Age')).toBeInTheDocument();
    expect(view.getByText('Subjects')).toBeInTheDocument();
    expect(view.getByText('Duration')).toBeInTheDocument();
    expect(view.getByText('Resources')).toBeInTheDocument();
  });

  it('can change subject filters', async () => {
    const { findByLabelText } = renderSearchResultsViewWithSampleData();

    const artsCheckbox = await findByLabelText(/Arts.*/);

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

    it('renders helper message with image and no filters bar', async () => {
      const initialQuery = 'hello';

      new ApiStub()
        .defaultUser()
        .queryVideos({
          query: initialQuery,
          results: buildVideoSearchResponse([]),
        })
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

    it('provides the correct counts for age range and subject filter', async () => {
      const initialQuery = 'hello';

      new ApiStub()
        .defaultUser()
        .queryVideos({
          query: initialQuery,
          results: buildVideoSearchResponse([video177], {
            subjects: {
              'art-id': {
                hits: 1,
              },
            },
            ageRanges: {
              '3-5': {
                hits: 100,
              },
            },
            durations: {
              'PT0S-PT2M': {
                hits: 101,
              },
            },
          }),
        })
        .queryCollections({
          query: initialQuery,
          results: collectionsResponse([]),
        });

      const view = renderSearchResultsView(initialQuery);

      expect(await view.findByLabelText('Arts (1)')).toBeInTheDocument();
      expect(await view.findByLabelText('3 - 5 (100)')).toBeInTheDocument();
      expect(await view.findByLabelText('0m - 2m (101)')).toBeInTheDocument();
    });

    it('renders only filters with a filter count greater 0', async () => {
      new ApiStub()
        .defaultUser()
        .queryVideos({
          query: 'climate',
          results: buildVideoSearchResponse([video177], {
            subjects: {
              'art-id': {
                hits: 0,
              },
            },
            ageRanges: {
              '3-5': {
                hits: 0,
              },
            },
            durations: {
              'PT0S-PT2M': {
                hits: 0,
              },
            },
          }),
        })
        .queryCollections({
          query: 'climate',
          results: collectionsResponse([]),
        });

      const view = renderSearchResultsView('climate');

      expect(await view.queryByLabelText('Arts (1)')).toBeNull();
      expect(await view.queryByLabelText('3 - 5 (100)')).toBeNull();
      expect(await view.queryByLabelText('0m - 2m (101)')).toBeNull();
    });
  });
});
