import { Card } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Video } from '../../types/Video';
import { removeFromDefaultCollectionAction } from '../searchResults/VideoCard';
import VideoPreview from '../video/preview/VideoPreview';

interface OwnProps {
  videos: Video[];
}

interface DispatchProps {
  onRemoveFromCollection: (video: Video) => void;
}

class CollectionItems extends React.PureComponent<DispatchProps & OwnProps> {
  public render() {
    return (
      <React.Fragment>
        {this.props.videos.map(video => {
          const callback = () => this.props.onRemoveFromCollection(video);
          return (
            <section data-qa="collection-video" key={video.id}>
              <Card className="search-result" bordered={false}>
                <VideoPreview
                  video={video}
                  isInCollection={true}
                  searchId={null}
                  onToggleInDefaultCollection={callback}
                />
              </Card>
            </section>
          );
        })}
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onRemoveFromCollection: video =>
      dispatch(removeFromDefaultCollectionAction(video)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CollectionItems);
