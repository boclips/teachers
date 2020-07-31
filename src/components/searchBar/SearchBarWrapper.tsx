import { push } from 'connected-react-router';
import queryString from 'query-string';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Completion, Lists } from 'src/components/searchBar/completions';
import State from '../../types/State';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import StatefulSearchBar from './StatefulSearchBar';
import './SearchBarWrapper.less';

export type SuggestionType = keyof Lists;

export const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(
    (state: State) =>
      queryString.parse(state.router.location.search).q as string,
  );

  const onQuerySubmitted = (
    value: string,
    completionId?: string,
    completion?: Completion,
  ) => {
    if (completion?.list === 'subjects') {
      dispatch(push(`/subjects/${completion.id}?completionId=${completionId}`));
    } else {
      dispatch(
        bulkUpdateSearchParamsAction([
          { page: 1 },
          { q: value, completion_id: completionId },
        ]),
      );
    }
  };

  return <StatefulSearchBar onSubmit={onQuerySubmitted} value={query} />;
};
