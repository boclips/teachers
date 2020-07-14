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
import SearchBar from './SearchBarWrapper';
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

  it('has an initial value from the location', () => {
    const wrapper = getWrapper('Test%20Query');
    expect(wrapper.getByDisplayValue('Test Query')).toBeVisible();
    expect(wrapper.getByTestId('search-input')).toBeVisible();
    expect(wrapper.getByText('Search')).toBeVisible();
  });

  it('shows auto complete entries when there are matching completions', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history europe' } });

    expect(wrapper.getByTestId(`result-history-europe`)).toHaveTextContent(
      'history europe',
    );
  });

  it('decorates content partner auto complete options', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'Hip Hughes History' } });

    expect(
      wrapper.getByTestId(`result-channel-hip-hughes-history`),
    ).toHaveTextContent('Hip Hughes History');
  });

  it('sets the query in the location on submit', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history' } });

    const searchButton = wrapper.getByText('Search');

    fireEvent.click(searchButton);

    return eventually(() => {
      expect(wrapper.history.location.search).toMatch(/q=history/);
    });
  });
});
