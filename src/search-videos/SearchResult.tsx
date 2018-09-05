import Card from 'antd/lib/Card';
import Skeleton from 'antd/lib/Skeleton';
import React from 'react';
import { Video } from './Video';

interface Props {
  loading: boolean;
  video?: Video;
}

export default class SearchResult extends React.PureComponent<Props> {
  public render() {
    return (
      <Card>
        <Skeleton loading={this.props.loading} paragraph={false}>
          {this.props.video ? (
            <h2 data-qa="search-result-title">{this.props.video.title}</h2>
          ) : null}
        </Skeleton>
      </Card>
    );
  }
}
