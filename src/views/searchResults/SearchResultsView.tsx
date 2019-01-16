import {Col, Row} from 'antd';
import Pagination from 'antd/lib/pagination/Pagination';
import {push} from 'connected-react-router';
import * as queryString from 'querystring';
import React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import SearchResult from '../../components/searchResults/multiple-results/SearchResult';
import {NewsBoxHeader} from '../../components/searchResults/NewsBoxHeader';
import {NewsBoxSidePanel} from '../../components/searchResults/NewsBoxSidePanel';
import {Links} from '../../types/Links';
import State, {SearchResults} from '../../types/State';
import {Video} from '../../types/Video';
import NoResultsView from './noResults/NoResultsView';

interface StateProps {
  loading: boolean;
  results: SearchResults;
  links: Links;
  currentPage: number;
  isNewsMode: boolean;
}

interface DispatchProps {
  onPageChange: (page: number, query: string, isNewsMode: boolean) => void;
}

class SearchResultsView extends React.PureComponent<StateProps & DispatchProps> {
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
    const isNewsMode = this.props.isNewsMode;

    return isNewsMode ? (
      <React.Fragment>
        <Row>
          <NewsBoxHeader
            onButtonClick={this.goFromNewsToSearchResults}
            resultsQuery={this.props.results.query}
          />
        </Row>
        <Row>{this.props.results.videos.map(this.renderVideo)}</Row>
      </React.Fragment>
    ) : (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 18 }}>
          {this.props.results.videos.map(this.renderVideo)}
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 6 }}>
          <NewsBoxSidePanel
            onButtonClick={this.goToNewsResults}
            resultsQuery={this.props.results.query}
          />
        </Col>
      </Row>
    );
  }

  public renderResultPlaceholders() {
    return (
      <section data-qa="search-results-placeholders">
        <SearchResult loading={true} searchId={null} video={null}/>
        <SearchResult loading={true} searchId={null} video={null}/>
        <SearchResult loading={true} searchId={null} video={null}/>
        <SearchResult loading={true} searchId={null} video={null}/>
        <SearchResult loading={true} searchId={null} video={null}/>
        <SearchResult loading={true} searchId={null} video={null}/>
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

function mapStateToProps({search, links, router}: State): StateProps {
  return {
    loading: search.loading,
    results: search,
    links,
    currentPage: +queryString.parse(router.location.search).page || 1,
    isNewsMode:
      queryString.parse(router.location.search).mode === 'news' || false,
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
