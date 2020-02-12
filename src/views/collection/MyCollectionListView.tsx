import { Icon } from 'antd';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import EmptyCollectionSVG from '../../../resources/images/empty-collection.svg';
import collectionsSVG from '../../../resources/images/our-collections.svg';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import PageLayout from '../../components/layout/PageLayout';
import './MyCollectionListView.less';

export class MyCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout
        title="Your Resources"
        showSearchBar={true}
        showNavigation={true}
        showFooter={true}
      >
        <section className="collection-list" data-qa="collection-list-page">
          {this.renderContent()}
        </section>
      </PageLayout>
    );
  }

  public renderContent() {
    return (
      <PageableCollectionCardList
        title={
          <span>
            <Icon component={collectionsSVG} /> Your resources
          </span>
        }
        collectionKey="myCollections"
        renderIfEmptyCollection={this.renderEmptyCollection()}
      />
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollectionSVG />
          <h1 data-qa="no-collections">
            You don&apos;t have any saved resources, yet.
          </h1>
          <p>Save your favourite videos and collections here.</p>
        </Col>
      </Row>
    );
  }
}
