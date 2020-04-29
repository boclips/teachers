import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import { Button } from 'antd';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import RemoteTeacherSVG from 'resources/images/remote-teacher.svg';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { PlatformInteractionType } from 'src/services/analytics/boclips/PlatformInteractionType';
import { InteractionTracker } from 'src/components/common/InteractionTracker';
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
                        PlatformInteractionType.REMOTE_LEARNING_BANNER_CLICKED,
                      )
                    }
                  >
                    <a
                      href="https://www.boclips.com/remote-learning-with-video-resources-for-teachers"
                      target={'_blank'}
                      className="remote-teaching"
                    >
                      <Row type="flex">
                        <Col xs={0} lg={10}>
                          <div className="remote-teaching__illustration">
                            <RemoteTeacherSVG />
                          </div>
                        </Col>
                        <Col sm={24} lg={14} className="copy-col">
                          <h1 className="alt">FREE remote learning toolkit</h1>
                          <p>
                            Tools, ideas and inspiration to use in virtual
                            classrooms
                          </p>
                          <Button className="display-desktop">
                            Explore kit
                          </Button>
                        </Col>
                      </Row>
                    </a>
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
