import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actionCreatorFactory } from '../../app/redux/actions';
import { Video } from '../../types/Video';
import SearchResult from './multiple-results/SearchResult';

interface Props {
  video: Video;
  searchId: string;
  isInCollection: boolean;
  onToggleInDefaultCollection: (inDefaultCollection: boolean) => boolean;
}

export const addToDefaultCollectionAction = actionCreatorFactory<Video>(
  'ADD_TO_DEFAULT_COLLECTION',
);

export const removeFromDefaultCollectionAction = actionCreatorFactory<Video>(
  'REMOVE_FROM_DEFAULT_COLLECTION',
);

interface DispatchProps {
  onToggleInDefaultCollection: (
    video: Video,
    inDefaultCollection: boolean,
  ) => void;
}

class VideoCard extends React.PureComponent<Props & DispatchProps> {
  private onToggleInDefaultCollection = (inDefaultCollection: boolean) => {
    this.props.onToggleInDefaultCollection(
      this.props.video,
      inDefaultCollection,
    );
  };

  public render() {
    return (
      <section data-qa="search-result">
        <SearchResult
          loading={false}
          video={this.props.video}
          searchId={this.props.searchId}
          isInCollection={this.props.isInCollection}
          onToggleInDefaultCollection={this.onToggleInDefaultCollection}
        />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    onToggleInDefaultCollection: (
      video: Video,
      inDefaultCollection: boolean,
    ) => {
      const action = inDefaultCollection
        ? addToDefaultCollectionAction
        : removeFromDefaultCollectionAction;
      dispatch(action(video));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(VideoCard);
