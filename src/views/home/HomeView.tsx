import { Button } from 'antd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import ReferAFriendBannerMobile from '../../../resources/images/refer-a-friend-banner-mobile.react.svg';
import ReferAFriendBanner from '../../../resources/images/refer-a-friend-banner.react.svg';
import BoclipsFooter from '../../components/common/BoclipsFooter';
import PageLayout from '../../components/layout/PageLayout';
import ReferAFriend from '../../components/ReferAFriend';
import SearchBar from '../../components/searchBar/SearchBar';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';

import GenericCollectionsGrid from '../../components/collection/gridList/GenericCollectionsGrid';
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
          </PageLayout>
        </section>
        <section className="refer-a-friend-banner">
          <Content>
            <Row>
              <Col>
                <ReferAFriend>
                  <ReferAFriendBanner
                    className="refer-a-friend-banner__img display-tablet-and-desktop"
                    tabIndex={0}
                    role="button"
                    aria-label="Refer a friend"
                  />
                  <ReferAFriendBannerMobile
                    className="refer-a-friend-banner__img display-mobile"
                    tabIndex={0}
                    role="button"
                    aria-label="Refer a friend"
                  />
                </ReferAFriend>
              </Col>
            </Row>
          </Content>
        </section>
        <section className="discovery-section">
          <Content>
            <Row>
              <Col>
                <section className="home-collections">
                  <GenericCollectionsGrid
                    collectionKey="publicCollections"
                    maxNumberOfCollections={6}
                    description="Spark your students' curiosity with teacher-made collections"
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
    );
  }

  private track(_: SyntheticEvent) {
    AnalyticsFactory.getInstance().trackHomepageExploreCollections();
  }
}
