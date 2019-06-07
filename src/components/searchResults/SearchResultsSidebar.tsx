import { Button, Card, Col, Row, Skeleton } from 'antd';
import React, { PureComponent } from 'react';
import collectionsImg from '../../../resources/images/collections.png';
import newsLogo from '../../../resources/images/news-logo.png';
import { VideoCollection } from '../../types/VideoCollection';
import { CollectionCardList } from '../collection/card/list/CollectionCardList';
import { NewsBoxProps } from './NewsBoxProps';
import './SearchResultsSidebar.less';

export class SearchResultsSidebar extends PureComponent<
  SearchResultsSidebarProps
> {
  public render(): React.ReactNode {
    return (
      <section className={'search-sidebar'}>
        <Row type="flex">
          <section
            data-qa="news-side-panel"
            key={'news-box'}
            className="news-box news-box__side-panel"
          >
            <Row type="flex">
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
            <Row type="flex" className="news-box__cta">
              <Button onClick={this.props.onButtonClick} size="large">
                View News
              </Button>
            </Row>
          </section>
          <section
            data-qa="collections-side-panel"
            className="search-sidebar__collections"
          >
            <CollectionCardList
              collections={this.props.collections}
              title={
                <span>
                  <img src={collectionsImg} alt="" /> Collections
                </span>
              }
              sidebar={true}
            />
          </section>
        </Row>
      </section>
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
