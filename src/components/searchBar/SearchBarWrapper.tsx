import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterState } from '../../types/State';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import StatefulSearchBar from './StatefulSearchBar';
import './SearchBarWrapper.less';

interface StateProps {
  query?: string;
}

interface DispatchProps {
  onQuerySubmitted: (query: string, completionId?: string) => void;
}

const SearchBar = ({ onQuerySubmitted, query }: StateProps & DispatchProps) => {
  return <StatefulSearchBar onSubmit={onQuerySubmitted} value={query} />;
};

function mapStateToProps(state: RouterState): StateProps {
  return {
    query: queryString.parse(state.router.location.search).q as string,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onQuerySubmitted: (query: string, completionId?: string) => {
      dispatch(
        bulkUpdateSearchParamsAction([
          { page: 1 },
          { q: query, completion_id: completionId },
        ]),
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
