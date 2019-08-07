import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import StopClickPropagation from '../../common/StopClickPropagation';
import { AgeRangeTag } from '../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../video/tags/SubjectTag';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../buttons/CollectionButtonsContainer';
import { CollectionSubtitle } from '../CollectionSubtitle';
import './CollectionHeader.less';
import { CollectionTitle } from './CollectionTitle';

interface Props {
  collection: VideoCollection;
}

export default class CollectionHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between">
          <Col>
            <CollectionTitle
              title={this.props.collection.title}
              isPublic={this.props.collection.isPublic}
              isMine={this.props.collection.isMine}
            />
            <span className="collection-header__bookmark-button display-mobile">
              <BookmarkCollectionButton collection={this.props.collection} />
            </span>
          </Col>
          <Col>
            <CollectionButtonsContainer
              className="collection-edit__header"
              collection={this.props.collection}
            />
            <span className="collection-header__bookmark-button display-tablet-and-desktop">
              <BookmarkCollectionButton collection={this.props.collection} />
            </span>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Row>
              {this.props.collection.subjects.map(subjectId => (
                <StopClickPropagation wrapper="span" key={subjectId}>
                  <ConnectedSubjectTag id={subjectId} />
                </StopClickPropagation>
              ))}
              {this.props.collection.ageRange.isBounded() && (
                <AgeRangeTag
                  ageRange={this.props.collection.ageRange.getLabel()}
                />
              )}

              <CollectionSubtitle
                collection={this.props.collection}
                classname="highlight collection-subtitle header"
              />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              data-qa="collection-description"
              className="collection-header__description"
            >
              {this.props.collection.description}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }

  public static Skeleton = () => (
    <section className="collection-header__skeleton">
      <Card className="video-card" bordered={false}>
        <AntSkeleton
          loading={true}
          title={true}
          paragraph={false}
          active={true}
          avatar={{ size: 'small', shape: 'circle' }}
        />
      </Card>
    </section>
  );
}
