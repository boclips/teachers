import { Button } from 'antd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PublicCollectionsGrid from '../../components/collection/public/PublicCollectionsGrid';
import BoclipsFooter from '../../components/common/BoclipsFooter';
import PageLayout from '../../components/layout/PageLayout';
import SearchBar from '../../components/searchBar/SearchBar';
import './HomeView.less';

const { Content } = Layout;
export default class HomeView extends PureComponent {
  public render() {
    return (
      <section className="home-page">
        <section className="search-section">
          <PageLayout
            data-qa="home-page"
            showSearchBar={false}
            hideFooter={true}
          >
            <Content>
              <Row>
                <Col
                  xs={{ span: 22, offset: 1 }}
                  md={{ span: 18, offset: 3 }}
                  xl={{ span: 14, offset: 5 }}
                >
                  <section className="home-search">
                    <section className="home-searchbar">
                      <label>I'm looking for:</label>
                      <SearchBar />
                    </section>
                  </section>
                </Col>
              </Row>
            </Content>
          </PageLayout>
        </section>
        <section className="discovery-section">
          <Content>
            <Row>
              <Col>
                <section className="home-collections">
                  <PublicCollectionsGrid
                    maxNumberOfCollections={6}
                    description="Spark your students' curiosity with teacher-made collections"
                  />
                </section>
              </Col>
            </Row>
            <Row>
              <Col>
                <section className="more-collections">
                  <Link to="/public-collections">
                    <Button htmlType="button" size="large">
                      Explore more collections
                    </Button>
                  </Link>
                </section>
              </Col>
            </Row>
          </Content>
        </section>
        <BoclipsFooter />
      </section>
    );
  }
}
