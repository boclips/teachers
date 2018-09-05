import Search from 'antd/lib/input/Search';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../redux/actions';
import { VideosState } from '../State';
import SearchResult from './SearchResult';
import { Video } from './Video';

export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface DispatchProps {
  onSearch: (query: string) => void;
}

interface StateProps {
  loading: boolean;
  videos: Video[];
  query: string;
}

export class SearchView extends PureComponent<DispatchProps & StateProps> {
  public render() {
    return (
      <section data-qa="search-page">
        <Search
          type="text"
          data-qa="search-input"
          onSearch={this.props.onSearch}
        />
        <section>{this.renderResults()}</section>
      </section>
    );
  }

  public renderResults() {
    if (this.props.loading) {
      return this.renderResultPlaceholders();
    }
    if (this.props.videos.length > 0) {
      return this.renderVideos();
    }
    if (this.props.query.length > 0) {
      return this.renderZeroResultsMessage();
    }
    return null;
  }

  public renderVideos() {
    return this.props.videos.map(this.renderVideo);
  }

  public renderResultPlaceholders() {
    return (
      <section data-qa="search-results-placeholders">
        <SearchResult loading={true} />
        <SearchResult loading={true} />
        <SearchResult loading={true} />
        <SearchResult loading={true} />
        <SearchResult loading={true} />
        <SearchResult loading={true} />
      </section>
    );
  }

  public renderZeroResultsMessage() {
    return (
      <span data-qa="search-zero-results">
        Your search for <em>{this.props.query}</em> returned no results
      </span>
    );
  }

  public renderVideo(video: Video, index: number) {
    return (
      <section key={index} data-qa="search-result">
        <SearchResult loading={false} video={video} />
      </section>
    );
  }
}

function mapStateToProps({ videos }: VideosState): StateProps {
  return { videos: videos.items, loading: videos.loading, query: videos.query };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { onSearch: query => dispatch(searchVideosAction(query)) };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchView);
