import Col from 'antd/lib/grid/col';
import Row from 'antd/lib/grid/row';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import emptyCollection from '../../../resources/images/empty-collection.svg';
import { actionCreatorFactoryVoid } from '../../app/redux/actions';
import { CollectionCardList } from '../../components/collection/CollectionCardList';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { CollectionState } from '../../types/State';
import { VideoCollection } from '../../types/VideoCollection';
import './CollectionListView.less';

export const fetchCollectionsAction = actionCreatorFactoryVoid(
  'FETCH_COLLECTIONS',
);

interface StateProps {
  collections: VideoCollection[];
}

interface DispatchProps {
  fetchCollection: () => void;
}

export class CollectionView extends PureComponent<StateProps & DispatchProps> {
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
    if (this.props.collections.length === 0) {
      return this.renderEmptyCollection();
    }

    return (
      this.props.collections && (
        <CollectionCardList collections={this.props.collections} />
      )
    );
  }

  private renderEmptyCollection() {
    return (
      <Row className="collections-view-empty">
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
    collections: state.collections,
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
)(CollectionView);
