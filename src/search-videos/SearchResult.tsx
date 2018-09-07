import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import moment = require('moment');
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
            <section>
              <h3 data-qa="search-result-title">{this.props.video.title}</h3>
              <p data-qa="search-result-description">
                {this.props.video.description}
              </p>
              <p data-qa="search-result-content-provider">
                {this.props.video.contentProvider}
              </p>
              <p data-qa="search-result-duration">
                {this.props.video.duration.toISOString()}
              </p>
              <p data-qa="search-result-released-on">
                {moment(this.props.video.releasedOn).format('MMM D, YYYY')}
              </p>
            </section>
          ) : null}
        </Skeleton>
      </Card>
    );
  }
}
