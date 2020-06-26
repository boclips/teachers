import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterState } from '../../types/State';
import { bulkUpdateSearchParamsAction } from '../searchResults/redux/actions/updateSearchParametersActions';
import './SearchBar.less'
import SearchBar from "src/bits/components/search-bar";

interface StateProps {
  query?: string;
}

interface DispatchProps {
  onQuerySubmitted: (query: string) => void;
}

export class SearchBarWrapper extends React.Component<
  StateProps & DispatchProps
> {
  public render() {
    return (
      <div className={"search-bar"}>
        <SearchBar size={"large"} placeholder={"Enter your search term"} onSearch={this.props.onQuerySubmitted} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarWrapper);
