import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Search from 'antd/lib/input/Search';
import Layout from 'antd/lib/layout/layout';
import { push } from 'connected-react-router';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import boclipsLogo from '../images/boclips-logo.png';
import { actionCreatorFactory } from '../redux/actions';
import SearchLayoutRouter from '../router/SearchLayoutRouter';

const { Header, Content, Footer } = Layout;
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
                <SearchLayoutRouter />
              </Col>
            </Row>
          </Content>
          <Footer className="boclips-footer">
            <p>Copyright © 2018 Boclips. All rights reserved.</p>
            <p>
              All trademarks, service marks, trade names, product names and
              logos appearing on the site are the property of their respective
              owners. Any rights not expressly granted herein are reserved.
            </p>
          </Footer>
        </section>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSearch: query => {
      dispatch(searchVideosAction(query));
      dispatch(push('/videos'));
    },
  };
}

export default connect<{}, DispatchProps, {}>(
  null,
  mapDispatchToProps,
)(SearchLayout);
