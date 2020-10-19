import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { fireEvent, within } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import eventually from 'test-support/eventually';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { FakeEventsClient } from 'boclips-api-client/dist/sub-clients/events/client/FakeEventsClient';
import { SearchQueryCompletionsSuggestedRequest } from 'boclips-api-client/dist/sub-clients/events/model/SearchQueryCompletionsSuggestedRequest';
import { FakeSuggestionsClient } from 'boclips-api-client/dist/sub-clients/suggestions/client/FakeSubjectsClient';
import { SearchBar } from './SearchBarWrapper';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import StatefulSearchBar from './StatefulSearchBar';

jest.mock(
  './completionsTopics.json',
  () => [
    'channel completion 1',
    'channel completion 2',
    'channel completion 3',
    'channel completion 4',
    'channel completion 5',
    'channel completion 6',
    'history europe',
    'geography',
    'geology',
  ],
  {
    virtual: true,
  },
);

let store: MockStore;
let statefulSearchBar: ReactWrapper<any>;

beforeEach(() => {
  store = MockStoreFactory.sample({
    router: {
      ...RouterFactory.sample(),
      location: {
        pathname: '',
        search: '?q=eggs',
        hash: '',
        state: null,
      },
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <SearchBar />
    </Provider>,
  );

  statefulSearchBar = wrapper.find(StatefulSearchBar);
});

test('Extracts query string from the path', () => {
  expect(statefulSearchBar).toHaveProp('value', 'eggs');
});

test('dispatches a navigation action when query submitted callback invoked', () => {
  const query = 'the meaning of life';
  statefulSearchBar.prop('onSubmit')(query);

  expect(store.getActions()).toContainEqual(
    bulkUpdateSearchParamsAction([{ page: 1 }, { q: 'the meaning of life' }]),
  );
});

describe('SearchBar', () => {
  const getWrapper = (initialQuery: string = '') => {
    const history = createMemoryHistory({
      initialEntries: [`/?q=${initialQuery}`],
    });

    return renderWithBoclipsStore(
      <SearchBar />,
      MockStoreFactory.sampleState({ router: undefined }),
      history,
    );
  };
  let eventsClient: FakeEventsClient;
  let suggestionsClient: FakeSuggestionsClient;

  beforeEach(async () => {
    eventsClient = ((await ApiClientWrapper.get()) as FakeBoclipsClient).events;
    eventsClient.clear();
    suggestionsClient = ((await ApiClientWrapper.get()) as FakeBoclipsClient)
      .suggestions;
    eventsClient.clear();
  });

  it('has an initial value from the location', () => {
    const wrapper = getWrapper('Test%20Query');

    expect(wrapper.getByDisplayValue('Test Query')).toBeVisible();
    expect(
      wrapper.getByPlaceholderText('Enter your search term'),
    )?.toBeVisible();
    expect(wrapper.getByText('Search')).toBeVisible();
  });

  it('shows auto complete entries when there are matching completions', async () => {
    const wrapper = getWrapper('');

    const searchInput = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(searchInput, { target: { value: 'history e' } });

    const events = eventsClient.getEvents();

    expect(await wrapper.findByText('history europe')).toBeInTheDocument();

    await eventually(() => {
      expect(events.length).toBe(1);
      const event = events[0] as SearchQueryCompletionsSuggestedRequest;
      expect(event?.searchQuery).toEqual('history e');
      expect(event?.impressions).toContain('history europe');
      expect(searchInput.parentElement.innerHTML).toContain(event?.componentId);
      expect(event?.completionId).not.toBeUndefined();
    });
  });

  it('only send impressions to the api client that are visible to the user', async () => {
    const wrapper = getWrapper('');

    const searchInput = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(searchInput, { target: { value: 'geo' } });

    const events = eventsClient.getEvents();

    await eventually(() => {
      expect(events.length).toBe(1);
      const event = events[0] as SearchQueryCompletionsSuggestedRequest;
      const shownSuggestions: string[] = event?.impressions;
      shownSuggestions.forEach((phrase) => {
        const segments: string[] = phrase.split('geo', 1);
        segments.forEach((segment) => {
          expect(wrapper.getAllByText(segment.trim()).length).toBeGreaterThan(
            0,
          );
        });
      });
    });
  });

  it('when user types, fire multiple events to track suggestions', async () => {
    const wrapper = getWrapper('');

    suggestionsClient.populate({
      suggestionTerm: 'eng',
      channels: [
        { id: 'channel-one', name: 'channel English 1' },
        { id: 'channel-two', name: 'channel English 2' },
        { id: 'channel-three', name: 'channel English 3' },
        { id: 'channel-three', name: 'channel English 4' },
      ],
      subjects: [
        { id: 'subject-one', name: 'Magic English' },
        { id: 'subject-two', name: 'Advanced English' },
        { id: 'subject-three', name: 'American English' },
        { id: 'subject-three', name: 'Australian English' },
      ],
    });

    const searchInput = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(searchInput, { target: { value: 'eng' } });
    fireEvent.change(searchInput, { target: { value: 'engl' } });

    await eventually(() => {
      const events = eventsClient.getEvents();
      expect(events.length).toBe(2);
      const firstEvent = events[0] as SearchQueryCompletionsSuggestedRequest;
      const secondEvent = events[1] as SearchQueryCompletionsSuggestedRequest;
      expect(firstEvent.searchQuery).toEqual('eng');
      expect(firstEvent.impressions).toContain('Magic English');
      expect(secondEvent.searchQuery).toEqual('engl');
      expect(secondEvent.impressions).toContain('Advanced English');
      expect(firstEvent.componentId).toEqual(secondEvent.componentId);
      expect(firstEvent.completionId).not.toEqual(secondEvent.completionId);
    });
  });

  it('clicking a subject search suggestion takes you to subject page', async () => {
    suggestionsClient.populate({
      suggestionTerm: 'eng',
      channels: [],
      subjects: [{ id: 'subject-one', name: 'Magic English' }],
    });
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'eng' } });

    const subjectSuggestion = await wrapper.findByTestId(
      'result-magic-english',
    );

    expect(within(subjectSuggestion).getByText('Magic')).toBeInTheDocument();
    expect(within(subjectSuggestion).getByText('Eng')).toBeInTheDocument();
    expect(within(subjectSuggestion).getByText('lish')).toBeInTheDocument();

    fireEvent.click(subjectSuggestion);

    expect(wrapper.history.location.pathname).toEqual(`/subjects/subject-one`);
    expect(wrapper.history.location.search).toMatch(/\?completionId=.+/);
  });

  it('sets the query in the location on submit', async () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'history' } });
    await wrapper.findByText('europe');

    const searchButton = wrapper.getByText('Search');

    fireEvent.click(searchButton);

    return eventually(() => {
      expect(wrapper.history.location.search).toMatch(/q=history/);
    });
  });

  it('sets completionId when user clicks on it', async () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'history' } });

    const suggestion = await wrapper.findByText('europe');

    fireEvent.click(suggestion);

    return eventually(() => {
      const event = eventsClient.getEvents()[0] as SearchQueryCompletionsSuggestedRequest;
      const queryParams = wrapper.history.location.search;
      expect(queryParams.includes('q=history%20europe')).toBeTruthy();
      expect(
        queryParams.includes(`completion_id=${event.completionId}`),
      ).toBeTruthy();
    });
  });

  it('shows max 4 topics, 3 subjects and 3 channels when suggesting', async () => {
    suggestionsClient.populate({
      suggestionTerm: 'eng',
      channels: [
        { id: 'channel-1', name: 'channel 1' },
        { id: 'channel-2', name: 'channel 2' },
        { id: 'channel-3', name: 'channel 3' },
        { id: 'channel-4', name: 'channel 4' },
        { id: 'channel-5', name: 'channel 5' },
        { id: 'channel-6', name: 'channel 6' },
        { id: 'channel-7', name: 'channel 7' },
      ],
      subjects: [
        { id: 'subject-1', name: 'channel subject 1' },
        { id: 'subject-2', name: 'channel subject 2' },
        { id: 'subject-3', name: 'channel subject 3' },
        { id: 'subject-4', name: 'channel subject 4' },
        { id: 'subject-5', name: 'channel subject 5' },
        { id: 'subject-6', name: 'channel subject 6' },
        { id: 'subject-7', name: 'channel subject 7' },
        { id: 'subject-8', name: 'channel subject 8' },
      ],
    });

    const wrapper = getWrapper('');
    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'channel' } });

    await eventually(() => {
      const events = eventsClient.getEvents();
      expect(eventsClient.getEvents().length).toBe(1);
      const event = events[0] as SearchQueryCompletionsSuggestedRequest;
      expect(event.impressions.length).toEqual(10);
      expect(event.impressions).toContain('channel completion 1');
      expect(event.impressions).toContain('channel completion 2');
      expect(event.impressions).toContain('channel completion 3');
      expect(event.impressions).toContain('channel completion 4');

      expect(event.impressions).toContain('channel subject 1');
      expect(event.impressions).toContain('channel subject 2');
      expect(event.impressions).toContain('channel subject 3');

      expect(event.impressions).toContain('channel 1');
      expect(event.impressions).toContain('channel 2');
      expect(event.impressions).toContain('channel 3');

      expect(event.impressions).not.toContain('channel 4');
      expect(event.impressions).not.toContain('channel completion 5');
      expect(event.impressions).not.toContain('channel subject 4');
    });
  });
});
