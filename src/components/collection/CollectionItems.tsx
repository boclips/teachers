import { Card } from 'antd';
import React from 'react';
import { Video } from '../../types/Video';
import VideoPreview from '../video/preview/VideoPreview';

interface Props {
  videos: Video[];
}

export class CollectionItems extends React.PureComponent<Props> {
  public render() {
    const callback = () => {};

    return (
      <React.Fragment>
        {this.props.videos.map(video => {
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
