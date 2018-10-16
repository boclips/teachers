import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { BoclipsFooter } from '../components/BoclipsFooter';
import boclipsLogo from '../images/boclips-logo.png';
import { actionCreatorFactory } from '../redux/actions';
import SearchBar from './search-videos/SearchBar';

const { Header, Content } = Layout;
export const searchVideosAction = actionCreatorFactory<string>('SEARCH_VIDEOS');

interface Props {
  children: React.ReactNode;
}

export default class TopSearchBarLayout extends PureComponent<Props> {
  public render() {
    return (
      <Layout>
        <section>
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
          <BoclipsFooter />
        </section>
      </Layout>
    );
  }
}
