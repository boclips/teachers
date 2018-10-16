import React from 'react';
import { connect } from 'react-redux';
import { SearchResults, SearchState } from '../../State';
import { Video } from '../Video';
import SearchResult from './SearchResult';

interface StateProps {
  loading: boolean;
  results: SearchResults;
}

class SearchResultsView extends React.PureComponent<StateProps> {
  public render() {
    return (
      <section className={'search-results-container'} data-qa="search-page">
        {this.renderResults()}
      </section>
    );
  }

  public renderResults() {
    if (this.props.loading) {
      return this.renderResultPlaceholders();
    }
    if (this.props.results.videos.length > 0) {
      return this.renderVideos();
    }
    if (this.props.results.query.length > 0) {
      return this.renderZeroResultsMessage();
    }
    return null;
  }

  public renderVideos() {
    return this.props.results.videos.map(this.renderVideo);
  }

  public renderResultPlaceholders() {
    return (
      <section data-qa="search-results-placeholders">
        <SearchResult loading={true} searchId={null} video={null} />
        <SearchResult loading={true} searchId={null} video={null} />
        <SearchResult loading={true} searchId={null} video={null} />
        <SearchResult loading={true} searchId={null} video={null} />
        <SearchResult loading={true} searchId={null} video={null} />
        <SearchResult loading={true} searchId={null} video={null} />
      </section>
    );
  }

  public renderZeroResultsMessage() {
    return (
      <span data-qa="search-zero-results">
        Your search for <em>{this.props.results.query}</em> returned no results
      </span>
    );
  }

  public renderVideo = (video: Video, index: number) => {
    return (
      <section key={index} data-qa="search-result">
        <SearchResult
          loading={false}
          video={video}
          searchId={this.props.results.searchId}
        />
      </section>
    );
  };
}

function mapStateToProps({ search }: SearchState): StateProps {
  return {
    loading: search.loading,
    results: search,
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null,
)(SearchResultsView);
