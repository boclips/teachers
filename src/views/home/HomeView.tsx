import { Button } from 'antd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import BoclipsFooter from '../../components/common/BoclipsFooter';
import PageLayout from '../../components/layout/PageLayout';
import SearchBar from '../../components/searchBar/SearchBar';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';

import PublicCollectionsGrid from '../../components/collection/grid/public/PublicCollectionsGrid';
import './HomeView.less';
import { VideosAndDisciplinesSection } from './VideosAndDisciplinesSection';

const { Content } = Layout;
export default class HomeView extends PureComponent {
  public render() {
    return (
      <React.Fragment>
        <section className="home-page">
          <section className="search-section">
            <PageLayout data-qa="home-page" showNavigation={true}>
              <Row>
                <Col
                  xs={{ span: 22, offset: 1 }}
                  md={{ span: 18, offset: 3 }}
                  xl={{ span: 14, offset: 5 }}
                >
                  <section className="home-search">
                    <section className="home-searchbar">
                      <label>I'm looking for a video about:</label>
                      <SearchBar />
                    </section>
                  </section>
                </Col>
              </Row>
            </PageLayout>
          </section>

          <VideosAndDisciplinesSection />

          <section className="discovery-section">
            <Content>
              <Row>
                <Col>
                  <section className="home-collections">
                    <PublicCollectionsGrid
                      maxNumberOfCollections={6}
                      description="Explore our curated collections made to engage students of all ages and enrich learning opportunities in the classroom."
                    />
                  </section>
                </Col>
              </Row>
              <Row>
                <Col>
                  <section className="more-collections">
                    <Link to="/public-collections" onClick={this.track}>
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
      </React.Fragment>
    );
  }

  private track(_: SyntheticEvent) {
    AnalyticsFactory.externalAnalytics().trackHomepageExploreCollections();
  }
}
