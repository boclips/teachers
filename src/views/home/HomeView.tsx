import { Button } from 'antd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';

import PublicCollectionsGrid from '../../components/collection/grid/public/PublicCollectionsGrid';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import './HomeView.less';

export default class HomeView extends PureComponent {
  public render() {
    return (
      <section className="home-page">
        <section className="search-section">
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
        </section>

        <section className="disciplines-section">
          <Row>
            <Col>
              <DisciplineCardList />
            </Col>
          </Row>
        </section>

        <section className="discovery-section">
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
        </section>
      </section>
    );
  }

  private track(_: SyntheticEvent) {
    AnalyticsFactory.externalAnalytics().trackHomepageExploreCollections();
  }
}
