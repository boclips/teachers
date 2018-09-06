import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import React from 'react';
import { Video } from './Video';

interface Props {
  loading: boolean;
  video?: Video;
}

export default class SearchResult extends React.PureComponent<Props> {
  public render() {
    return (
      <Card className="search-result">
        <Skeleton loading={this.props.loading} paragraph={false}>
          {this.props.video ? (
            <h3 data-qa="search-result-title">{this.props.video.title}</h3>
          ) : null}
        </Skeleton>
      </Card>
    );
  }
}
