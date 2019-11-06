import { Col } from 'antd';
import Pagination from 'antd/lib/pagination/Pagination';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import withNewsNavigation, {
  NewsNavigationProps,
} from '../../components/common/higerOrderComponents/withNewsNavigation';
import PageLayout from '../../components/layout/PageLayout';
import {
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
} from '../../components/searchBar/redux/reducers/searchReducer';
import SearchResultsWithHeader from '../../components/searchResults/multiple-results/SearchResultsWithHeader';
import SearchResultsWithSidebar from '../../components/searchResults/multiple-results/SearchResultsWithSidebar';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import { updatePageAction } from '../../components/searchResults/redux/actions/updatePageAction';
import { SearchResultsSidebar } from '../../components/searchResults/SearchResultsSidebar';
import { Links } from '../../types/Links';
import { VideoResults } from '../../types/SearchResults';
import State from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import NoResultsView from './noResults/NoResultsView';
import './SearchResultsView.less';

interface StateProps {
  loading: boolean;
  videoResults: VideoResults;
  collectionResults: VideoCollection[];
  links: Links;
  currentPage: number;
  userId: string | null;
}

interface DispatchProps {
  onPageChange: (page: number) => void;
}

class SearchResultsView extends React.PureComponent<
  StateProps & DispatchProps & NewsNavigationProps
> {
  public render() {
    return (
      <PageLayout
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
    if (this.props.videoResults.videos.length > 0) {
      return this.renderResults();
    }
    if (this.props.videoResults.query.length > 0) {
      return this.renderZeroResultsMessage();
    }
    return null;
  }

  public renderResults() {
    const isNewsMode = this.props.isNewsMode;
    const props = {
      videoResults: this.props.videoResults,
      collectionResults: this.props.collectionResults,
      userId: this.props.userId,
    };
    return (
      <section className={'search-results-container'} data-qa="search-page">
        {isNewsMode ? (
          <SearchResultsWithHeader
            onNavigate={this.props.goToSearchResults}
            {...props}
          />
        ) : (
          <SearchResultsWithSidebar
            onNavigate={this.props.goToNewsResults}
            {...props}
          />
        )}

        {this.renderPagination()}
      </section>
    );
  }

  public renderPagination() {
    return (
      this.props.videoResults.paging && (
        <section className={'results-pagination'} data-qa="pagination">
          <Pagination
            current={this.props.currentPage}
            defaultCurrent={this.props.currentPage}
            defaultPageSize={this.props.videoResults.paging.size}
            total={this.props.videoResults.paging.totalElements}
            onChange={this.changePage}
          />
        </section>
      )
    );
  }

  public renderResultPlaceholders() {
    const isNewsMode = this.props.isNewsMode;

    return (
      <section
        className="search-results-placeholders"
        data-qa="search-results-placeholders"
      >
        <Col xs={{ span: 24 }} xl={{ span: isNewsMode ? 24 : 18 }}>
          <VideoCardsPlaceholder />
        </Col>
        {!isNewsMode && (
          <Col xs={{ span: 0 }} xl={{ span: 5 }}>
            <SearchResultsSidebar.Skeleton />
          </Col>
        )}
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
    loading: search.videoSearch.loading,
    videoResults: {
      ...search.videoSearch,
      videos: getVideosFromSearchResult(state),
    },
    collectionResults: getCollectionsFromSearchResult(state),
    links,
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

export default withNewsNavigation(
  connect<StateProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchResultsView),
);
