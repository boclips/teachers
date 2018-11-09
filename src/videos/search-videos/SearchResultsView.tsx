import React from 'react';
import { connect } from 'react-redux';
import { Links } from '../../links/Links';
import { SearchResults } from '../../State';
import State from '../../State';
import { Video } from '../Video';
import SearchResult from './SearchResult';
import ZeroResultsView from './ZeroResultsView';

interface StateProps {
  loading: boolean;
  results: SearchResults;
  links: Links;
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
      <ZeroResultsView
        links={this.props.links}
        query={this.props.results.query}
      />
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

function mapStateToProps({ search, links }: State): StateProps {
  return {
    loading: search.loading,
    results: search,
    links,
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  null,
)(SearchResultsView);
