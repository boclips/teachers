import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import boclipsLogo from '../images/boclips-logo.png';
import { actionCreatorFactory } from '../redux/actions';
import SearchBar from './search-videos/SearchBar';

const { Header, Content, Footer } = Layout;
export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface Props {
  children: React.ReactNode;
}

export default class SearchLayout extends PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <section data-qa="search-page">
          <Header className="fixed">
            <Row>
              <Col span={8}>
                <Link to="/" data-qa="boclips-logo">
                  <img className="logo" src={boclipsLogo} />
                </Link>
              </Col>
              <Col span={16}>
                <SearchBar />
              </Col>
            </Row>
          </Header>
          <Content>
            <Row>
              <Col span={24}>{this.props.children}</Col>
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
