import Pagination from 'antd/lib/pagination/Pagination';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FiniteGrid } from 'src/components/common/Grid/FiniteGrid';
import {
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
} from 'src/components/searchBar/redux/reducers/searchReducer';
import { updatePageAction } from 'src/components/searchResults/redux/actions/updatePageAction';
import { VideoCardsPlaceholder } from 'src/components/searchResults/VideoCardsPlaceholder';
import { Links } from 'src/types/Links';
import {
  CollectionSearchResult,
  VideoSearchResult,
} from 'src/types/SearchResults';
import State from 'src/types/State';
import SearchResultsWithHeader from '../../components/searchResults/SearchResultsWithHeader';
import PageLayout from '../../components/layout/PageLayout';
import NoResultsView from './noResults/NoResultsView';
import './SearchResultsView.less';

interface StateProps {
  loading: boolean;
  videoResults: VideoSearchResult;
  collectionResults: CollectionSearchResult;
  links: Links;
  currentPage: number;
  userId: string | null;
}

interface DispatchProps {
  onPageChange: (page: number) => void;
}

class SearchResultsView extends React.PureComponent<
  StateProps & DispatchProps
> {
  public render() {
    return (
      <PageLayout
        title={`"${this.props.videoResults.query}"`}
        showTabs={true}
        showNavigation={true}
        showFooter={true}
        showSearchBar={true}
      >
        {this.renderContent()}
      </PageLayout>
    );
  }

  private renderContent() {
    if (this.props.loading) {
      return this.renderResultPlaceholders();
    }

    const hasSearchResults =
      this.props.videoResults.videos.length > 0 ||
      this.props.collectionResults.collections.length > 0;

    if (hasSearchResults) {
      return this.renderResults();
    }

    if (this.props.videoResults.query.length > 0) {
      return this.renderZeroResultsMessage();
    }

    return null;
  }

  public renderResults() {
    const props = {
      videoResults: this.props.videoResults,
      collectionResults: this.props.collectionResults,
      userId: this.props.userId,
    };
    return (
      <section className={'search-results-container'} data-qa="search-page">
        <SearchResultsWithHeader {...props} />

        {this.renderPagination()}
      </section>
    );
  }

  public renderPagination() {
    if (
      !this.props.videoResults.paging ||
      this.props.videoResults.paging.totalPages === 0
    ) {
      return null;
    }

    return (
      <section className={'results-pagination'} data-qa="pagination">
        <Pagination
          current={this.props.currentPage}
          defaultCurrent={this.props.currentPage}
          defaultPageSize={this.props.videoResults.paging.size}
          total={this.props.videoResults.paging.totalElements}
          onChange={this.changePage}
        />
      </section>
    );
  }

  public renderResultPlaceholders() {
    return (
      <section
        className="search-results-placeholders"
        data-qa="search-results-placeholders"
      >
        <FiniteGrid>
          <VideoCardsPlaceholder />
        </FiniteGrid>
      </section>
    );
  }

  public renderZeroResultsMessage() {
    return <NoResultsView query={this.props.videoResults.query} />;
  }

  private changePage = (currentPage: number) => {
    this.props.onPageChange(currentPage);
  };
}

function mapStateToProps(state: State): StateProps {
  const { search, links, router, user } = state;

  return {
    loading: search.videoSearch.loading || search.collectionSearch.loading,
    videoResults: {
      ...search.videoSearch,
      videos: getVideosFromSearchResult(state),
    },
    collectionResults: {
      ...search.collectionSearch,
      collections: getCollectionsFromSearchResult(state),
    },
    links: links ? links.entries : null,
    currentPage: +queryString.parse(router.location.search).page || 1,
    userId: user ? user.id : null,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onPageChange: (page: number) => {
      dispatch(updatePageAction({ page }));
    },
  };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsView);
