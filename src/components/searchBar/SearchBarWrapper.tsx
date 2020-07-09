import queryString from 'query-string';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '@bit/dev-boclips.boclips-ui.components.search-bar';
import { RouterState } from '../../types/State';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import './SearchBarWrapper.less';

export const SearchBarWrapper = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: RouterState) =>
      queryString.parse(state.router.location.search).q as string,
  );
  const onQuerySubmitted = (search: string) => {
    dispatch(bulkUpdateSearchParamsAction([{ page: 1 }, { q: search }]));
    console.log('current query is ', search);
  };
  return (
    <div className="search-bar">
      <SearchBar
        size="large"
        initialQuery={query}
        key={query}
        placeholder="Enter your search term"
        onSearch={onQuerySubmitted}
      />
    </div>
  );
};

export default SearchBarWrapper;
