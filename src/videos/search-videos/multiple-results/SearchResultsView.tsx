import Pagination from 'antd/lib/pagination/Pagination';
import { push } from 'connected-react-router';
import * as queryString from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Links } from '../../../links/Links';
import State, { SearchResults } from '../../../State';
import { Video } from '../../Video';
import NoResultsView from '../no-results/NoResultsView';
import SearchResult from './SearchResult';

interface StateProps {
  loading: boolean;
  results: SearchResults;
  links: Links;
  currentPage: number;
}

interface DispatchProps {
  onPageChange: (pageNumber: number, query: string) => void;
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

  private renderResultCount() {
    const totalElements = this.props.results.paging.totalElements;
    return (
      !this.props.loading && (
        <div className="results-count">
          <span className={'count'} data-qa="search-count">
            {totalElements}
          </span>
          result(s) found
        </div>
      )
    );
  }

  public renderResults() {
    return (
      <section className={'search-results-container'} data-qa="search-page">
        {this.renderResultCount()}
        {this.renderVideos()}
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
      <NoResultsView
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

  private changePage = (currentPage: number) => {
    console.log('query', this.props.results.query);
    this.props.onPageChange(currentPage, this.props.results.query);
  };
}

function mapStateToProps({ search, links, router }: State): StateProps {
  return {
    loading: search.loading,
    results: search,
    links,
    currentPage: +queryString.parse(router.location.search).pageNumber || 1,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onPageChange: (pageNumber: number, query: string) => {
      const queryParams = queryString.stringify({
        q: query,
        pageNumber,
      });
      dispatch(push(`/videos?${queryParams}`));
    },
  };
}

export default connect<StateProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultsView);
