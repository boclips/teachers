import Search from 'antd/lib/input/Search';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouterState } from '../../State';
import { searchVideosAction } from '../SearchLayout';

interface StateProps {
  query?: string;
}

interface DispatchProps {
  onSearch: (query: string) => void;
}

export class SearchBar extends React.Component<StateProps & DispatchProps> {
  public render() {
    return (
      <Search
        placeholder="Enter your search term"
        type="text"
        data-qa="search-input"
        aria-label="search"
        onSearch={this.props.onSearch}
        enterButton="Search"
      />
    );
  }

  public componentDidMount() {
    if (this.props.query) {
      this.props.onSearch(this.props.query);
    }
  }
}

function mapStateToProps(state: RouterState): StateProps {
  return {
    query: queryString.parse(state.router.location.search).q,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSearch: (query: string) => {
      dispatch(searchVideosAction(query));
      const queryParams = queryString.stringify({ q: query });
      dispatch(push(`/videos?${queryParams}`));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
