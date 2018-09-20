import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import React from 'react';
import VideoPreview from '../components/VideoPreview';
import { Video } from '../Video';

interface Props {
  loading: boolean;
  video: Video | null;
  searchId: string | null;
}

export default class SearchResult extends React.PureComponent<Props> {
  public render() {
    return (
      <Card className="search-result" bordered={false}>
        <Skeleton
          loading={this.props.loading}
          active={true}
          title={{ width: '300px' }}
          paragraph={{ rows: 5 }}
          avatar={{ shape: 'square', size: 'large' }}
        >
          {this.props.video ? (
            <VideoPreview
              video={this.props.video}
              searchId={this.props.searchId}
            />
          ) : null}
        </Skeleton>
      </Card>
    );
  }
}
