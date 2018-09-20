import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../../images/boclips-logo.png';
import { actionCreatorFactory } from '../../redux/actions';
import { SearchResults, SearchState } from '../../State';
import { Video } from '../Video';
import SearchResult from './SearchResult';

const { Header, Content } = Layout;
export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface DispatchProps {
  onSearch: (query: string) => void;
}

interface StateProps {
  loading: boolean;
  results: SearchResults;
}

export class SearchView extends PureComponent<DispatchProps & StateProps> {
  public render() {
    return (
      <Layout>
        <section data-qa="search-page">
          <Header className="fixed">
            <Row>
              <Col span={8}>
                <img className="logo" src={boclipsLogo} />
              </Col>
              <Col span={16}>
                <Search
                  placeholder="Enter your search term"
                  type="text"
                  data-qa="search-input"
                  aria-label="search"
                  onSearch={this.props.onSearch}
                  enterButton="Search"
                />
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>
                <section>{this.renderResults()}</section>
              </Col>
            </Row>
          </Content>
        </section>
      </Layout>
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
        <SearchResult loading={true} video={null} searchId={null} />
        <SearchResult loading={true} video={null} searchId={null} />
        <SearchResult loading={true} video={null} searchId={null} />
        <SearchResult loading={true} video={null} searchId={null} />
        <SearchResult loading={true} video={null} searchId={null} />
        <SearchResult loading={true} video={null} searchId={null} />
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

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { onSearch: query => dispatch(searchVideosAction(query)) };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchView);
