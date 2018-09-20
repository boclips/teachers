import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../../images/boclips-logo.png';
import { actionCreatorFactory } from '../../redux/actions';
import { VideosState } from '../../State';
import { Video } from '../Video';
import SearchResult from './SearchResult';

const { Header, Content } = Layout;
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
  return {
    videos: videos.items,
    loading: videos.loading,
    query: videos.query.phrase,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { onSearch: query => dispatch(searchVideosAction(query)) };
}

export default connect<StateProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(SearchView);
