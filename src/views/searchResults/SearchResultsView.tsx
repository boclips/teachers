import { Col } from 'antd';
import Pagination from 'antd/lib/pagination/Pagination';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PageLayout from '../../components/layout/PageLayout';
import {
  getCollectionsFromSearchResult,
  getVideosFromSearchResult,
} from '../../components/searchBar/redux/reducers/searchReducer';
import SearchResultsWithHeader from '../../components/searchResults/multiple-results/SearchResultsWithHeader';
import { VideoCardsPlaceholder } from '../../components/searchResults/multiple-results/VideoCardsPlaceholder';
import { updatePageAction } from '../../components/searchResults/redux/actions/updatePageAction';
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
    if (this.props.videoResults.videos.length > 0) {
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
    return (
      <section
        className="search-results-placeholders"
        data-qa="search-results-placeholders"
      >
        <Col xs={{ span: 24 }} xl={{ span: 18 }}>
          <VideoCardsPlaceholder />
        </Col>
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

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsView);
