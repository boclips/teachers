import { Icon } from 'antd';
import Card from 'antd/lib/card';
import Skeleton from 'antd/lib/skeleton';
import { BoclipsPlayer } from 'boclips-react-player';
import React from 'react';
import DateFormatter from '../components/DateFormatter';
import DurationFormatter from '../components/DurationFormatter';
import { Video } from '../Video';

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
          {this.props.video ? (
            <section className="search-result-content">
              <section className={'search-result-thumbnail'}>
                <BoclipsPlayer
                  thumbnail={this.props.video.thumbnailUrl}
                  stream={this.props.video.streamUrl}
                />
              </section>
              <section className="search-result-details">
                <section className={'search-result-header'}>
                  <h3 className="title" data-qa="search-result-title">
                    {this.props.video.title}
                  </h3>
                  <p
                    data-qa="search-result-duration"
                    className={'subtitle duration'}
                  >
                    <Icon type="clock-circle" />{' '}
                    <DurationFormatter duration={this.props.video.duration} />
                  </p>
                </section>
                <p className={'subtitle'}>
                  Released on{' '}
                  <span data-qa="search-result-released-on">
                    <DateFormatter date={this.props.video.releasedOn} />
                  </span>{' '}
                  by{' '}
                  <span data-qa="search-result-content-provider">
                    {this.props.video.contentProvider}
                  </span>
                </p>
                <p data-qa="search-result-description" className="description">
                  {this.props.video.description}
                </p>
              </section>
            </section>
          ) : null}
        </Skeleton>
      </Card>
    );
  }
}
