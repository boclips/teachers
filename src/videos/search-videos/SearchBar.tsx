import { push } from 'connected-react-router';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterState } from '../../State';
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
        onQuerySubmitted={this.props.onQuerySubmitted}
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
      const queryParams = queryString.stringify({
        q: query,
        pageNumber: 1,
      });
      dispatch(push(`/videos?${queryParams}`));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
