import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import Layout from 'antd/lib/layout/layout';
import React, { PureComponent } from 'react';
import { BoclipsFooter } from 'src/components/common/BoclipsFooter';
import PublicCollectionsGrid from '../../components/collection/grid/public/PublicCollectionsGrid';
import PageLayout from '../../components/layout/PageLayout';
import SearchBar from '../../components/searchBar/SearchBar';
import { VideosAndDisciplinesSection } from './VideosAndDisciplinesSection';

import './HomeView.less';

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
                      <label>I&apos;m looking for a video about:</label>
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
            </Content>
          </section>
          <BoclipsFooter />
        </section>
      </React.Fragment>
    );
  }
}
