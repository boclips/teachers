import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MockStore } from 'redux-mock-store';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import eventually from 'test-support/eventually';
import { MockStoreFactory, RouterFactory } from 'test-support/factories';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import SearchBar from './SearchBar';
import StatefulSearchBar from './StatefulSearchBar';
import {SearchBarWrapper} from "src/components/searchBar/SearchBarWrapper";

let store: MockStore;

let statefulSearchBar: ReactWrapper<any>;
describe('path changes', () => {
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
        <SearchBarWrapper />
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
});

describe('SearchBar', () => {
  it('shows auto complete searches and channels when there are matches', async () => {
    const history = createMemoryHistory({
      initialEntries: [`/?q=`],
    });

    const wrapper = renderWithBoclipsStore(
      <SearchBarWrapper />,
      MockStoreFactory.sampleState({ router: undefined }),
      history,
    );

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history' } });

    expect(wrapper.getByText('history europe')).toBeInTheDocument();

    expect(wrapper.getByText('history USA')).toBeInTheDocument();

    expect(
      wrapper.getByText('Channel: Hip Hughes History'),
    ).toBeInTheDocument();
  });

  it('has an initial value from the location', () => {
    const history = createMemoryHistory({
      initialEntries: [`/?q=Test%20Query`],
    });

    const wrapper = renderWithBoclipsStore(
      <SearchBarWrapper />,
      MockStoreFactory.sampleState({ router: undefined }),
      history,
    );
    expect(wrapper.getByDisplayValue('Test Query')).toBeVisible();
    expect(wrapper.getByTestId('search-input')).toBeVisible();
    expect(wrapper.getByText('Search')).toBeVisible();
  });

  it('sets the query in the location on submit', () => {
    const history = createMemoryHistory({
      initialEntries: [`/?q=`],
    });

    const wrapper = renderWithBoclipsStore(
      <SearchBarWrapper />,
      MockStoreFactory.sampleState({ router: undefined }),
      history,
    );

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history' } });

    const searchButton = wrapper.getByText('Search');

    fireEvent.click(searchButton);

    return eventually(() => {
      expect(wrapper.history.location.search).toMatch(/q=history/);
    });
  });
  describe(`clear button`, () => {
    it('clears the search query when the clear icon is pressed', async () => {
      const history = createMemoryHistory({
        initialEntries: [`/?q=`],
      });

      const wrapper = renderWithBoclipsStore(
        <SearchBarWrapper />,
        MockStoreFactory.sampleState({ router: undefined }),
        history,
      );

      const input = wrapper.getByTestId('search-input');

      fireEvent.change(input, { target: { value: 'history' } });

      const clearButton = wrapper.getByTestId('clear-search-button');

      expect(clearButton).toBeInTheDocument();
      await fireEvent.click(clearButton);
      expect(await wrapper.queryByText('history')).toBeNull();
    });
  });
});
