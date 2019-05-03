import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import collections from '../../../resources/images/collections.png';
import EmptyCollection from '../../../resources/images/empty-collection.svg';
import { CollectionCardList } from '../../components/collection/card/list/CollectionCardList';
import { fetchMyCollectionsAction } from '../../components/collection/redux/actions/fetchMyCollectionsAction';
import PageLayout from '../../components/layout/PageLayout';
import { CollectionState, Pageable } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionListView.less';

interface StateProps {
  collections: Pageable<VideoCollection>;
  loading: boolean;
}

interface DispatchProps {
  fetchCollection: () => void;
}

export class CollectionListView extends PureComponent<
  StateProps & DispatchProps
> {
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
    if (!this.props.collections) {
      return null;
    }

    const collectionIsEmpty =
      !this.props.collections.items ||
      this.props.collections.items.length === 0;

    if (!this.props.loading && collectionIsEmpty) {
      return this.renderEmptyCollection();
    }

    return (
      this.props.collections && (
        <CollectionCardList
          title={
            <span>
              <img src={collections} alt="" /> My video collections
            </span>
          }
          collections={this.props.collections.items}
        />
      )
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <EmptyCollection />
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

function mapStateToProps(state: CollectionState): StateProps {
  return {
    collections: state.collections.myCollections,
    loading: state.collections.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchCollection: () => dispatch(fetchMyCollectionsAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionListView);
