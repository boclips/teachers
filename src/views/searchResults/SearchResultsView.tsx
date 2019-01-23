import Pagination from 'antd/lib/pagination/Pagination';
import { push } from 'connected-react-router';
import * as queryString from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SearchResultsCount from '../../components/searchResults/multiple-results/SearchResultsCount';
import { SearchResultsPlaceholders } from '../../components/searchResults/multiple-results/SearchResultsPlaceholders';
import SearchResultsWithHeader from '../../components/searchResults/multiple-results/SearchResultsWithHeader';
import SearchResultsWithSidebar from '../../components/searchResults/multiple-results/SearchResultsWithSidebar';
import { Links } from '../../types/Links';
import State, { SearchResults } from '../../types/State';
import NoResultsView from './noResults/NoResultsView';

interface StateProps {
  loading: boolean;
  results: SearchResults;
  links: Links;
  currentPage: number;
  isNewsMode: boolean;
  collectionVideoIds: string[];
}

interface DispatchProps {
  onPageChange: (page: number, query: string, isNewsMode: boolean) => void;
}

class SearchResultsView extends React.PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    if (this.props.loading) {
      return this.renderResultPlaceholders();
    }
    if (this.props.results.videos.length > 0) {
      return this.renderResults();
    }
    if (this.props.results.query.length > 0) {
      return this.renderZeroResultsMessage();
    }
    return null;
  }

  public renderResults() {
    const isNewsMode = this.props.isNewsMode;

    const isVideoInCollection = (videoId: string): boolean => {
      return this.props.collectionVideoIds.indexOf(videoId) > -1;
    };

    return (
      <section className={'search-results-container'} data-qa="search-page">
        {!this.props.loading && (
          <SearchResultsCount count={this.props.results.paging.totalElements} />
        )}

        {isNewsMode ? (
          <SearchResultsWithHeader
            query={this.props.results.query}
            searchId={this.props.results.searchId}
            videos={this.props.results.videos}
            onNavigate={this.goFromNewsToSearchResults}
            isInCollection={isVideoInCollection}
          />
        ) : (
          <SearchResultsWithSidebar
            query={this.props.results.query}
            searchId={this.props.results.searchId}
            videos={this.props.results.videos}
            onNavigate={this.goToNewsResults}
            isInCollection={isVideoInCollection}
          />
        )}

        {this.renderPagination()}
      </section>
    );
  }

  public renderPagination() {
    return (
      this.props.results.paging && (
        <section className={'results-pagination'} data-qa="pagination">
          <Pagination
            current={this.props.currentPage}
            defaultCurrent={this.props.currentPage}
            defaultPageSize={this.props.results.paging.size}
            total={this.props.results.paging.totalElements}
            onChange={this.changePage}
          />
        </section>
      )
    );
  }

  public renderResultPlaceholders() {
    return (
      <section data-qa="search-results-placeholders">
        <SearchResultsPlaceholders />
      </section>
    );
  }

  public renderZeroResultsMessage() {
    return (
      <NoResultsView
        links={this.props.links}
        query={this.props.results.query}
      />
    );
  }

  private changePage = (currentPage: number) => {
    this.props.onPageChange(
      currentPage,
      this.props.results.query,
      this.props.isNewsMode,
    );
  };

  private goFromNewsToSearchResults = () => {
    this.props.onPageChange(1, this.props.results.query, false);
  };

  private goToNewsResults = () => {
    this.props.onPageChange(1, this.props.results.query, true);
  };
}

function mapStateToProps({
  search,
  links,
  router,
  videoCollection,
}: State): StateProps {
  return {
    loading: search.loading,
    results: search,
    links,
    currentPage: +queryString.parse(router.location.search).page || 1,
    isNewsMode:
      queryString.parse(router.location.search).mode === 'news' || false,
    collectionVideoIds: videoCollection.videos.map(video => video.id),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onPageChange: (page: number, query: string, isNewsMode: boolean) => {
      const queryParams = queryString.stringify({
        q: query,
        page,
        mode: isNewsMode ? 'news' : undefined,
      });
      dispatch(push(`/videos?${queryParams}`));
    },
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsView);
