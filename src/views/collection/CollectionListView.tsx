import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import { CollectionCardList } from '../../components/collection/CollectionCardList';
import { fetchCollectionsAction } from '../../components/collection/redux/actions/fetchCollectionsAction';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { CollectionState } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionListView.less';

interface StateProps {
  collections: VideoCollection[];
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
      <TopSearchBarLayout>
        <section className="collection-list" data-qa="collection-list-page">
          {this.renderContent()}
        </section>
      </TopSearchBarLayout>
    );
  }

  public renderContent() {
    if (!this.props.collections) {
      return null;
    }
    if (!this.props.loading && this.props.collections.length === 0) {
      return this.renderEmptyCollection();
    }

    return (
      this.props.collections && (
        <CollectionCardList
          collections={this.props.collections}
          loading={this.props.loading}
        />
      )
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty" data-qa="collections-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <img src={emptyCollection} />
          <h1 data-qa="no-collections">You have no collections</h1>
          <p>
            You can create a collection by clicking the Save button on your
            favorite videos and choosing the new collection option
          </p>
        </Col>
      </Row>
    );
  }

  public componentDidMount() {
    this.props.fetchCollection();
  }
}

function mapStateToProps(state: CollectionState): StateProps {
  return {
    collections: state.collections.items,
    loading: state.collections.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchCollection: () => dispatch(fetchCollectionsAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionListView);
