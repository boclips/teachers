import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import collections from '../../../resources/images/collections.png';
import EmptyCollectionSVG from '../../../resources/images/empty-collection.svg';
import PageableCollectionCardList from '../../components/collection/card/list/PageableCollectionCardList';
import PageLayout from '../../components/layout/PageLayout';
import './MyCollectionListView.less';

export default class MyCollectionListView extends PureComponent {
  public render() {
    return (
      <PageLayout>
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
            <img src={collections} alt="" /> My video collections
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
          <h1 data-qa="no-collections">You have no collections, yet.</h1>
          <p>
            Use the Save button on your favourite videos to create your very own
            collection.
          </p>
        </Col>
      </Row>
    );
  }
}
