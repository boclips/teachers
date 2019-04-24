import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import collectionsImg from '../../../../resources/images/collections.png';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCardList } from '../card/CollectionCardList';
import { fetchNextPublicCollectionsAction } from '../redux/actions/fetchNextPublicCollectionsAction';
import { fetchPublicCollectionsAction } from '../redux/actions/fetchPublicCollectionsAction';

interface Props {
  maxNumberOfCollections?: number;
  description: string;
}

interface StateProps {
  publicCollections: VideoCollection[];
  loading: boolean;
  hasMorePublicCollections: boolean;
}

interface DispatchProps {
  fetchPublicCollections: () => void;
  fetchNextPage: () => void;
}

class PublicCollectionsGrid extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render() {
    return (
      <CollectionCardList
        title={
          <span>
            <img src={collectionsImg} alt="" /> Most recent video collections
          </span>
        }
        description={this.props.description}
        grid={true}
        loading={this.props.loading}
        collections={this.props.publicCollections}
        maxNumberOfCollections={this.props.maxNumberOfCollections}
        infiniteScroll={
          this.props.maxNumberOfCollections
            ? undefined
            : {
                next: this.props.fetchNextPage,
                hasMore: this.props.hasMorePublicCollections,
              }
        }
      />
    );
  }

  public componentDidMount(): void {
    this.fetchCollectionsIfNeeded();
  }

  public componentDidUpdate(): void {
    this.fetchCollectionsIfNeeded();
  }

  private fetchCollectionsIfNeeded() {
    if (!this.props.publicCollections) {
      this.props.fetchPublicCollections();
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPublicCollections: () => {
    return dispatch(fetchPublicCollectionsAction());
  },
  fetchNextPage: () => {
    AnalyticsFactory.getInstance().trackMorePublicCollectionsLoaded();
    return dispatch(fetchNextPublicCollectionsAction());
  },
});

function mapStateToProps({ collections }: State): StateProps {
  return {
    loading: collections.loading,
    publicCollections:
      collections.publicCollections && collections.publicCollections.items,
    hasMorePublicCollections:
      collections.publicCollections &&
      collections.publicCollections.links.next &&
      true,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicCollectionsGrid);
