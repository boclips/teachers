import { Button, Card, Col, Row, Skeleton } from 'antd';
import React, { PureComponent } from 'react';
import newsLogo from '../../../resources/images/news-logo.png';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCardList } from '../collection/card/list/CollectionCardList';
import './NewsBox.less';
import { NewsBoxProps } from './NewsBoxProps';

export class SearchResultsSidebar extends PureComponent<
  SearchResultsSidebarProps
> {
  public render(): React.ReactNode {
    return (
      <Row type="flex" justify="center">
        <section
          data-qa="news-side-panel"
          key={'news-box'}
          className="news-box news-box__side-panel"
        >
          <Row type="flex" justify="center">
            <Col>
              <img className="news-box__logo" src={newsLogo} alt="" />
            </Col>
            <Col>
              <div className="news-box__title-container">
                <p className="news-box__title text--secondary">
                  {this.props.resultsQuery}
                </p>
                <p className="news-box__title news-box__title--bold text--secondary">
                  On the news
                </p>
              </div>
            </Col>
          </Row>
          <Row type="flex" className="news-box__cta" justify="center">
            <Button onClick={this.props.onButtonClick} size="large">
              View News
            </Button>
          </Row>
        </section>
        <section data-qa="collections-side-panel">
          <CollectionCardList
            collections={this.props.collections}
            title="Collections"
            sidebar={true}
          />
        </section>
      </Row>
    );
  }

  public static Skeleton = () => (
    <Card
      className="video-card"
      bordered={false}
      style={{ marginLeft: '32px' }}
    >
      <Skeleton
        loading={true}
        active={true}
        title={{ width: '150px' }}
        paragraph={{ rows: 2 }}
      />
    </Card>
  );
}

interface SearchResultsSidebarProps extends NewsBoxProps {
  collections: VideoCollection[];
}
