import { Button, Col, Row } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import DigitalCitizenshipSVG from 'resources/images/digital-citizenship-homepage.svg';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { InteractionTracker } from 'src/components/common/InteractionTracker';
import { Link } from 'react-router-dom';
import SearchBarWrapper from 'src/components/searchBar/SearchBarWrapper';
import { PromotedCollectionsGrid } from '../../components/collection/grid/PromotedCollectionsGrid';
import { BoclipsFooter } from '../../components/common/BoclipsFooter';
import PageLayout from '../../components/layout/PageLayout';
import { VideosAndDisciplinesSection } from './VideosAndDisciplinesSection';

import './HomeView.less';

const { Content } = Layout;

export const COLLECTIONS_COUNT = 9;

export default class HomeView extends PureComponent {
  public render() {
    return (
      <>
        <section className="home-page">
          <section className="search-section">
            <PageLayout data-qa="home-page" showNavigation>
              <Row>
                <Col
                  xs={{ span: 22, offset: 1 }}
                  md={{ span: 18, offset: 3 }}
                  xl={{ span: 14, offset: 5 }}
                >
                  <section className="home-search">
                    <div className="home-searchbar">
                      <span className="home-search-label">
                        Let&apos;s plan your next lesson:
                      </span>
                      <SearchBarWrapper />
                    </div>
                  </section>
                </Col>
              </Row>
            </PageLayout>
          </section>

          <section>
            <Content>
              <InteractionTracker
                onInteraction={() =>
                  AnalyticsFactory.internalAnalytics().trackPlatformInteraction(
                    PlatformInteractionType.DIGITAL_CITIZENSHIP_COLLECTION_OPENED,
                  )
                }
              >
                <Link
                  to="/collections/5ecd3a5515f802372946d4dc"
                  className="home-banner"
                >
                  <div className="home-banner__illustration display-desktop">
                    <DigitalCitizenshipSVG />
                  </div>
                  <div className="copy-col">
                    <h1 className="alt">Digital Citizenship - Social Media</h1>
                    <p>Help students understand how to keep safe online</p>
                    <Button className="display-desktop">Explore series</Button>
                  </div>
                </Link>
              </InteractionTracker>
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
      </>
    );
  }
}
