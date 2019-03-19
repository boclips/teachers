import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import { CollectionCardList } from '../card/CollectionCardList';
import { fetchPublicCollectionsAction } from '../redux/actions/fetchPublicCollectionsAction';

interface Props {
  numberOfCollections?: number;
  description: string;
}

interface StateProps {
  publicCollections: VideoCollection[];
  loading: boolean;
}

interface DispatchProps {
  fetchPublicCollections: () => void;
}

class PublicCollectionsGrid extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render() {
    return (
      <CollectionCardList
        title="Video collections"
        description={this.props.description}
        tiny={true}
        loading={this.props.loading}
        collections={this.props.publicCollections}
      />
    );
  }

  public componentDidMount(): void {
    if (!this.props.publicCollections) {
      this.props.fetchPublicCollections();
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  fetchPublicCollections: () => dispatch(fetchPublicCollectionsAction()),
});

function mapStateToProps({ collections }: State): StateProps {
  return {
    loading: collections.loading,
    publicCollections: collections.publicCollections,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicCollectionsGrid);
