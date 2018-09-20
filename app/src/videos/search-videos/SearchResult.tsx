import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import React from 'react';
import { Video } from '../Video';
import VideoPreview from "../components/VideoPreview";

interface Props {
  loading: boolean;
  video?: Video;
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
          {this.props.video ? (<VideoPreview video={this.props.video} />) : null}
        </Skeleton>
      </Card>
    );
  }
}
