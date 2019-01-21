import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactoryVoid } from '../../app/redux/actions';
import { CollectionItems } from '../../components/collection/CollectionItems';
import TopSearchBarLayout from '../../components/searchBar/TopSearchBarLayout';
import { CollectionState } from '../../types/State';
import { Video } from '../../types/Video';

export const fetchCollectionAction = actionCreatorFactoryVoid(
  'FETCH_COLLECTION',
);

interface StateProps {
  videos: Video[];
}

interface DispatchProps {
  fetchCollection: () => void;
}

export class CollectionView extends PureComponent<StateProps & DispatchProps> {
  public render() {
    return <TopSearchBarLayout>{this.renderContent()}</TopSearchBarLayout>;
  }

  public renderContent() {
    return (
      this.props.videos && (
        <section data-qa="collection-page">
          <CollectionItems videos={this.props.videos} />
        </section>
      )
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

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    fetchCollection: () => dispatch(fetchCollectionAction()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionView);
