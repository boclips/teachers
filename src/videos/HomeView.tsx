import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { BoclipsFooter } from '../components/BoclipsFooter';
import boclipsLogo from '../images/boclips-logo.png';
import SearchBar from './search-videos/SearchBar';

const { Content } = Layout;
export default class HomeView extends PureComponent {
  public render() {
    return (
      <Layout data-qa="home-page">
        <Content>
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 18, offset: 3 }}
              xl={{ span: 14, offset: 5 }}
            >
              <section className="home-search">
                <section className="home-logo">
                  <img className="logo" src={boclipsLogo} />
                </section>

                <hr className="home-divider" />
                <section className="home-searchbar">
                  <label>I'm looking for:</label>
                  <SearchBar />
                </section>
              </section>
            </Col>
          </Row>
        </Content>
        <BoclipsFooter />
      </Layout>
    );
  }
}
