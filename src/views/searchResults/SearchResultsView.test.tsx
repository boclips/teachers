import { fireEvent } from '@testing-library/react';
import debounce from 'lodash/debounce';
import { axiosMock } from 'test-support/MockFetchVerify';
import { renderSearchResultsViewWithSampleData } from 'test-support/views/searchResultsViewRender';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { VideoFactory } from 'boclips-api-client/dist/test-support/VideosFactory';

jest.mock('lodash/debounce', () => {
  let latestCallback = null;
  const debounceFn = jest.fn();

  const mockDebounce = (callback) => {
    latestCallback = callback;
    return debounceFn;
  };

  mockDebounce.triggerLastCallback = () => {
    const args: [] = debounceFn.mock.calls[debounceFn.mock.calls.length - 1];

    latestCallback(...args);
  };

  return mockDebounce;
});

describe('SearchResultsView - mocked debounce', () => {
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

  it('changing multiple filters does not trigger multiple searches but waits', async () => {
    const view = renderSearchResultsViewWithSampleData();

    axiosMock.resetHistory();

    const artsOption = await view.findByLabelText(/Arts.*/);
    await fireEvent.click(artsOption);

    const otherSubjectOption = await view.findByLabelText(/Other subject.*/);
    await fireEvent.click(otherSubjectOption);

    debounce.triggerLastCallback();

    // Should see only 1 requests for collection search and not 2
    expect(axiosMock.history.get.length).toEqual(1);
  }, 10000);
});
