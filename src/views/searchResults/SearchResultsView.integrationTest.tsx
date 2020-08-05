import { fireEvent, waitFor } from '@testing-library/react';
import {
  renderSearchResultsView,
  renderSearchResultsViewWithSampleData,
} from 'test-support/views/searchResultsViewRender';
import ApiStub from 'test-support/ApiStub';
import { collectionsResponse } from 'test-support/api-responses';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

describe('SearchResultsView', () => {
  beforeEach(async () => {
    const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
    client.videos.insertVideo(
      VideoFactory.sample({ id: '177', title: `video 1 hello` }),
    );
    client.videos.insertVideo(
      VideoFactory.sample({ id: '456', title: `video 2 hello` }),
    );

    client.videos.setFacets({
      ageRanges: {
        '3-5': {
          hits: 3,
        },
      },
      subjects: {
        'art-id': {
          hits: 10,
        },
        'other-id': {
          hits: 12,
        },
      },
      durations: {
        'PT10M-PT20M': {
          hits: 3,
        },
      },
      resourceTypes: {
        Activity: {
          hits: 2,
        },
      },
    });
  });

  it('panel contains filters for age, subjects, duration, and resource type', async () => {
    const view = renderSearchResultsViewWithSampleData();
    expect(view.getByText('Filter results')).toBeInTheDocument();

    await waitFor(() => expect(view.getByText('Age')).toBeInTheDocument());
    expect(view.getByText('Subjects')).toBeInTheDocument();
    expect(view.getByText('Duration')).toBeInTheDocument();
    expect(view.getByText('Resources')).toBeInTheDocument();
  });

  it('can change subject filters', async () => {
    const view = renderSearchResultsViewWithSampleData();

    await waitFor(() => expect(view.getByText('Subjects')).toBeInTheDocument());

    const artsCheckbox = view.getByLabelText(/Arts.*/);
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
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.videos.clear();

      new ApiStub().defaultUser().queryCollections({
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
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.videos.setFacets({
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
        resourceTypes: {},
      });

      new ApiStub().defaultUser().queryCollections({
        query: initialQuery,
        results: collectionsResponse([]),
      });

      const view = renderSearchResultsView(initialQuery);

      expect(await view.findByLabelText('Arts (1)')).toBeInTheDocument();
      expect(await view.findByLabelText('3 - 5 (100)')).toBeInTheDocument();
      expect(await view.findByLabelText('0m - 2m (101)')).toBeInTheDocument();
    });

    it('renders only filters with a filter count greater 0', async () => {
      const client = (await ApiClientWrapper.get()) as FakeBoclipsClient;
      client.videos.setFacets({
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
        resourceTypes: {},
      });

      new ApiStub().defaultUser().queryCollections({
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
