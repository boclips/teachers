import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../images/boclips-logo.png';
import { actionCreatorFactory } from '../redux/actions';
import SearchResultsView from './search-videos/SearchResultsView';

const { Header, Content } = Layout;
export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface DispatchProps {
  onSearch: (query: string) => void;
}

export class SearchLayout extends PureComponent<DispatchProps> {
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
                <SearchResultsView />
              </Col>
            </Row>
          </Content>
        </section>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { onSearch: query => dispatch(searchVideosAction(query)) };
}

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps,
)(SearchLayout);
