import { Button, Col, Row } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import DigitalCitizenshipSVG from 'resources/images/digital-citizenship-homepage.svg';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { InteractionTracker } from 'src/components/common/InteractionTracker';
import { Link } from 'react-router-dom';
import { PromotedCollectionsGrid } from '../../components/collection/grid/PromotedCollectionsGrid';
import { BoclipsFooter } from '../../components/common/BoclipsFooter';
import PageLayout from '../../components/layout/PageLayout';
import SearchBar from '../../components/searchBar/SearchBar';
import { VideosAndDisciplinesSection } from './VideosAndDisciplinesSection';

import './HomeView.less';

const { Content } = Layout;

export const COLLECTIONS_COUNT = 9;

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
                      <label>Let&apos;s plan your next lesson:</label>
                      <SearchBar />
                    </section>
                  </section>
                </Col>
              </Row>
            </PageLayout>
          </section>

          <section>
            <Content>
              <Row>
                <Col>
                  <InteractionTracker
                    onInteraction={() =>
                      AnalyticsFactory.internalAnalytics().trackPlatformInteraction(
                        PlatformInteractionType.DIGITAL_CITIZENSHIP_COLLECTION_OPENED,
                      )
                    }
                  >
                    <Link
                      to={'/collections/5ecd3a5515f802372946d4dc'}
                      className={'home-banner'}
                    >
                      <Row>
                        <Col xs={0} lg={10}>
                          <div className="home-banner__illustration">
                            <DigitalCitizenshipSVG />
                          </div>
                        </Col>
                        <Col sm={24} lg={14} className="copy-col">
                          <h1 className="alt">
                            Digital Citizenship - Social Media
                          </h1>
                          <p>
                            Help students understand how to keep safe online
                          </p>
                          <Button className="display-desktop">
                            Explore series
                          </Button>
                        </Col>
                      </Row>
                    </Link>
                  </InteractionTracker>
                </Col>
              </Row>
            </Content>
          </section>

          <VideosAndDisciplinesSection />

          <section className="discovery-section">
            <Content>
              <Row>
                <Col>
                  <section className="home-collections">
                    <PromotedCollectionsGrid
                      maxNumberOfCollections={COLLECTIONS_COUNT}
                      description="Explore our curated collections made to engage students of all ages and enrich learning opportunities in the classroom."
                    />
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
}
