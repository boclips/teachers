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
  './completionsCreatedBy.json',
  () => [
    "Rachel's English",
    'English for Dummies',
    'Crash Course English',
    'Another English Channel',
    'The Best English Channel',
    'Crash Course Engineering',
  ],
  {
    virtual: true,
  },
);

jest.mock(
  './completionsTopics.json',
  () => [
    'geographical energy',
    'geographical geology',
    'geographical process',
    'geographical urbanization',
    'geography maps ',
    'geography topography',
    ' english as a second language',
    'english ',
    ' history',
    'art history',
    'british english',
    ' american english',
    'american english 2 ',
    'history europe',
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

    expect(await wrapper.findByText('urope')).toBeInTheDocument();

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

    const searchInput = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(searchInput, { target: { value: 'eng' } });
    fireEvent.change(searchInput, { target: { value: 'engi' } });

    await eventually(() => {
      const events = eventsClient.getEvents();
      expect(events.length).toBe(2);
      const firstEvent = events[0] as SearchQueryCompletionsSuggestedRequest;
      const secondEvent = events[1] as SearchQueryCompletionsSuggestedRequest;
      expect(firstEvent.searchQuery).toEqual('eng');
      expect(firstEvent.impressions).toContain("Rachel's English");
      expect(secondEvent.searchQuery).toEqual('engi');
      expect(secondEvent.impressions).toContain('Crash Course Engineering');
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
      channels: [],
      subjects: [
        { id: 'subject-one', name: 'Magic English' },
        { id: 'subject-two', name: 'Advanced English' },
        { id: 'subject-three', name: 'American English' },
        { id: 'subject-three', name: 'Australian English' },
      ],
    });

    const wrapper = getWrapper('');
    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'eng' } });

    await wrapper.findByText('Magic');

    await eventually(() => {
      const events = eventsClient.getEvents();
      expect(eventsClient.getEvents().length).toBe(1);
      const event = events[0] as SearchQueryCompletionsSuggestedRequest;

      expect(event.impressions.length).toEqual(10);
      expect(event.impressions).toContain('english as a second language');
      expect(event.impressions).toContain('english');
      expect(event.impressions).toContain('british english');
      expect(event.impressions).toContain('american english');
      expect(event.impressions).not.toContain('american english 2');

      expect(event.impressions).toContain('Magic English');
      expect(event.impressions).toContain('Advanced English');
      expect(event.impressions).toContain('American English');
      expect(event.impressions).not.toContain('Australian English');

      expect(event.impressions).toContain("Rachel's English");
      expect(event.impressions).toContain('English for Dummies');
      expect(event.impressions).toContain('Another English Channel');

      expect(event.impressions).not.toContain('Crash Course English');
      expect(event.impressions).not.toContain('The Best English Channel');
      expect(event.impressions).not.toContain('Crash Course Engineering');
    });
  });
});
