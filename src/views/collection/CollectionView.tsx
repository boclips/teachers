import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import { CollectionSubtitle } from '../../components/collection/CollectionSubtitle';
import { CollectionTitle } from '../../components/collection/CollectionTitle';
import { renameCollectionAction } from '../../components/collection/redux/actions/renameCollectionAction';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { CollectionVideoCardList } from '../../components/video/list/VideoCardList';
import { CollectionState } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import { fetchCollectionsAction } from './CollectionListView';
import './CollectionView.less';

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  collection?: VideoCollection;
}

interface DispatchProps {
  fetchCollections: () => void;
  onRenameCollection: (collection: VideoCollection) => (title: string) => void;
}

export class CollectionView extends PureComponent<StateProps & DispatchProps> {
  public render() {
    return (
      <TopSearchBarLayout>
        <section data-qa="collection-page">{this.renderContent()}</section>
      </TopSearchBarLayout>
    );
  }

  public renderContent() {
    if (!this.props.collection || !this.props.collection.videos) {
      return null;
    }
    if (this.props.collection.videos.length === 0) {
      return this.renderEmptyCollection();
    }

    return (
      <section className="collection-view__collection-details">
        <CollectionTitle
          title={this.props.collection.title}
          onEdit={this.props.onRenameCollection(this.props.collection)}
        />
        <CollectionSubtitle collection={this.props.collection} />
        {this.props.collection.videos && (
          <CollectionVideoCardList
            videos={this.props.collection.videos}
            currentCollection={this.props.collection}
          />
        )}
      </section>
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collection-view-empty">
        <Col md={{ offset: 6, span: 12 }} lg={{ offset: 8, span: 8 }}>
          <img src={emptyCollection} />
          <h1 data-qa="collection-empty-title">
            This video collection is empty
          </h1>
          <p>
            You can add videos by searching for a topic and then clicking the
            Save button on your favorite videos
          </p>
        </Col>
      </Row>
    );
  }

  public componentDidMount() {
    this.props.fetchCollections();
  }
}

function mapStateToProps(
  state: CollectionState,
  ownProps: OwnProps,
): StateProps {
  return {
    collection: state.collections.items.find(
      c => c.id === ownProps.collectionId,
    ),
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchCollections: () => dispatch(fetchCollectionsAction()),
    onRenameCollection: (collection: VideoCollection) => (title: string) =>
      dispatch(
        renameCollectionAction({ title, originalCollection: collection }),
      ),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
