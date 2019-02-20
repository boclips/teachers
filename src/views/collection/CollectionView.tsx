import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import { actionCreatorFactory } from '../../app/redux/actions';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { CollectionVideoCardList } from '../../components/video/list/VideoCardList';
import { CollectionState } from '../../types/State';
import { Video } from '../../types/Video';
import './CollectionView.less';

export const fetchCollectionAction = actionCreatorFactory<string>(
  'FETCH_COLLECTION',
);

interface OwnProps {
  collectionId: string;
}

interface StateProps {
  videos: Video[];
}

interface DispatchProps {
  fetchCollection: () => void;
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
    if (!this.props.videos) {
      return null;
    }
    if (this.props.videos.length === 0) {
      return this.renderEmptyCollection();
    }

    return (
      this.props.videos && (
        <CollectionVideoCardList videos={this.props.videos} />
      )
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
    this.props.fetchCollection();
  }
}

function mapStateToProps(state: CollectionState): StateProps {
  return {
    videos: state.videoCollection.videos,
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    fetchCollection: () =>
      dispatch(fetchCollectionAction(ownProps.collectionId)),
  };
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
