import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterState } from '../../types/State';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import StatefulSearchBar from './StatefulSearchBar';

interface StateProps {
  query?: string;
}

interface DispatchProps {
  onQuerySubmitted: (query: string) => void;
}

export class SearchBar extends React.Component<StateProps & DispatchProps> {
  public render() {
    return (
      <StatefulSearchBar
        onSubmit={this.props.onQuerySubmitted}
        value={this.props.query}
      />
    );
  }
}

function mapStateToProps(state: RouterState): StateProps {
  return {
    query: queryString.parse(state.router.location.search).q as string,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onQuerySubmitted: (query: string) => {
      dispatch(bulkUpdateSearchParamsAction([{ page: 1 }, { q: query }]));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
