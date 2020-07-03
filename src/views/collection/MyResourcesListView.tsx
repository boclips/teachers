import Icon from '@ant-design/icons';
import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import EmptyCollectionSVG from '../../../resources/images/empty-collection.svg';
import collectionsSVG from '../../../resources/images/our-collections.svg';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import PageLayout from '../../components/layout/PageLayout';
import './MyResourcesListView.less';

export default class MyResourcesListView extends PureComponent {
  public renderContent = () => (
    <PageableCollectionCardList
      title={
        <span>
          <Icon component={collectionsSVG} /> Your resources
        </span>
      }
      collectionKey="myResources"
      renderIfEmptyCollection={MyResourcesListView.renderEmptyCollection()}
    />
  );

  private static renderEmptyCollection() {
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

  public render() {
    return (
      <PageLayout
        title="Your Resources"
        showSearchBar
        showNavigation
        showFooter
      >
        <section className="collection-list" data-qa="collection-list-page">
          {this.renderContent()}
        </section>
      </PageLayout>
    );
  }
}
