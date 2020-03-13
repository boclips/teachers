import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import { MockStoreFactory } from 'test-support/factories';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import eventually from 'test-support/eventually';
import SearchBar from './SearchBar';

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

  it.todo('clears the search query when the clear icon is pressed');

  it('shows auto complete entries when there are matching completions', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history' } });

    const options = wrapper.getAllByRole('option');

    expect(
      options.filter(option => option.textContent.match(/history europe/)),
    ).toHaveLength(1);

    expect(
      options.filter(option => option.textContent.match(/history USA/)),
    ).toHaveLength(1);

    expect(
      options.filter(option => option.textContent.match(/Hip Hughes History/)),
    ).toHaveLength(1);
  });

  it('decorates content partner auto complete options', () => {
    const wrapper = getWrapper('');

    const input = wrapper.getByTestId('search-input');

    fireEvent.change(input, { target: { value: 'history' } });

    const options = wrapper.getAllByRole('option');

    expect(
      options.filter(option => option.textContent.match(/history europe/)),
    ).toHaveLength(1);

    expect(
      options.filter(option =>
        option.textContent.match(/Channel: Hip Hughes History/),
      ),
    ).toHaveLength(1);
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
