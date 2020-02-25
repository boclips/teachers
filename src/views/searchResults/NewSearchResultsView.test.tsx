import { fireEvent } from '@testing-library/react';
import debounce from 'lodash/debounce';
import { axiosMock } from 'test-support/MockFetchVerify';
import { renderSearchResultsViewWithSampleData } from 'test-support/views/searchResultsViewRender';

jest.mock('lodash/debounce', () => {
  let latestCallback = null;
  const debounceFn = jest.fn();

  const mockDebounce = (callback, _) => {
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
  it(`changing multiple filters does not trigger multiple searches but waits`, async () => {
    const view = renderSearchResultsViewWithSampleData();

    const subjectsInput = await view.findByText('Choose from our list..');
    await fireEvent.click(subjectsInput);

    axiosMock.resetHistory();

    const artsOption = await view.findByText('Arts');
    await fireEvent.click(artsOption);

    const otherSubjectOption = await view.findByText('Other subject');
    await fireEvent.click(otherSubjectOption);

    debounce.triggerLastCallback();

    const selectedSubjects = await view.findAllByTestId('subject-filter-tag');
    expect(selectedSubjects.length).toEqual(2);
    expect(selectedSubjects[0]).toBeInTheDocument();
    expect(selectedSubjects[1]).toBeInTheDocument();
    // Should see only 2 requests (1 video search and 1 collection search) and not 4
    expect(axiosMock.history.get.length).toEqual(2);
  });
});
