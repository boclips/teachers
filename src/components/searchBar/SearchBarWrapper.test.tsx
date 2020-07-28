import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import eventually from 'test-support/eventually';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { ApiClientWrapper } from 'src/services/apiClient';
import { FakeBoclipsClient } from 'boclips-api-client/dist/test-support';
import { FakeEventsClient } from 'boclips-api-client/dist/sub-clients/events/client/FakeEventsClient';
import { SearchQueryCompletionsSuggestedRequest } from 'boclips-api-client/dist/sub-clients/events/model/SearchQueryCompletionsSuggestedRequest';
import SearchBar from './SearchBarWrapper';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import StatefulSearchBar from './StatefulSearchBar';

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

  beforeEach(async () => {
    eventsClient = ((await ApiClientWrapper.get()) as FakeBoclipsClient).events;
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

    expect(wrapper.getByText('urope')).toBeInTheDocument();

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

    const firstAutocompleteDropdown = wrapper.getByRole('listbox').textContent;

    fireEvent.change(searchInput, { target: { value: 'engi' } });

    const secondAutocompleteDropdown = wrapper.getByRole('listbox').textContent;

    expect(secondAutocompleteDropdown).not.toEqual(firstAutocompleteDropdown);
    expect(firstAutocompleteDropdown).toEqual("Rachel's English");
    expect(secondAutocompleteDropdown).toEqual('Crash Course Engineering');

    await eventually(() => {
      const events = eventsClient.getEvents();
      expect(events.length).toBe(2);
      const firstEvent = events[0] as SearchQueryCompletionsSuggestedRequest;
      const secondEvent = events[1] as SearchQueryCompletionsSuggestedRequest;
      expect(firstEvent.componentId).toEqual(secondEvent.componentId);
    });
  });

  it('decorates content partner auto complete options', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'Hip Hughes History' } });

    expect(
      wrapper.getByTestId(`result-channel-hip-hughes-history`),
    ).toHaveTextContent('Hip Hughes History');
  });

  it('sets the query in the location on submit', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'history' } });

    const searchButton = wrapper.getByText('Search');

    fireEvent.click(searchButton);

    return eventually(() => {
      expect(wrapper.history.location.search).toMatch(/q=history/);
    });
  });

  it('sets completionId when user clicks on it', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByPlaceholderText('Enter your search term');

    fireEvent.change(input, { target: { value: 'history' } });

    const suggestion = wrapper.getByText('europe');

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
});
