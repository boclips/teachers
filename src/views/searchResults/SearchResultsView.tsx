import { Col } from 'antd';
import Pagination from 'antd/lib/pagination/Pagination';
import { push } from 'connected-react-router';
import * as queryString from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import withNewsNavigation, {
  NewsNavigationProps,
} from '../../components/common/higerOrderComponents/withNewsNavigation';
import PageLayout from '../../components/layout/PageLayout';
import { SearchResultsPlaceholders } from '../../components/searchResults/multiple-results/SearchResultsPlaceholders';
import SearchResultsWithHeader from '../../components/searchResults/multiple-results/SearchResultsWithHeader';
import SearchResultsWithSidebar from '../../components/searchResults/multiple-results/SearchResultsWithSidebar';
import { NewsBoxSidebar } from '../../components/searchResults/NewsBoxSidebar';
import { Links } from '../../types/Links';
import State, { SearchResults } from '../../types/State';
import NoResultsView from './noResults/NoResultsView';
import './SearchResultsView.less';

interface StateProps {
  loading: boolean;
  results: SearchResults;
  links: Links;
  currentPage: number;
}

interface DispatchProps {
  onPageChange: (page: number, query: string, isNewsMode: boolean) => void;
}

class SearchResultsView extends React.PureComponent<
  StateProps & DispatchProps & NewsNavigationProps
> {
  public render() {
    return <PageLayout showTabs={true}>{this.renderContent()}</PageLayout>;
  }

  private renderContent() {
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

    return (
      <section className={'search-results-container'} data-qa="search-page">
        {isNewsMode ? (
          <SearchResultsWithHeader
            results={this.props.results}
            onNavigate={this.props.goToSearchResults}
          />
        ) : (
          <SearchResultsWithSidebar
            results={this.props.results}
            onNavigate={this.props.goToNewsResults}
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
    const isNewsMode = this.props.isNewsMode;

    return (
      <section
        className="search-results-placeholders"
        data-qa="search-results-placeholders"
      >
        <Col xs={{ span: 24 }} md={{ span: isNewsMode ? 24 : 18 }}>
          <SearchResultsPlaceholders />
        </Col>
        {!isNewsMode && (
          <Col xs={{ span: 0 }} md={{ span: 5, push: 1 }}>
            <NewsBoxSidebar.Skeleton />
          </Col>
        )}
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
}

function mapStateToProps({ search, links, router }: State): StateProps {
  return {
    loading: search.loading,
    results: search,
    links,
    currentPage: +queryString.parse(router.location.search).page || 1,
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

export default withNewsNavigation(
  connect<StateProps, {}, {}>(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchResultsView),
);
