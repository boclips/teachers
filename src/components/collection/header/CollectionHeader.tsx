import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import { AgeRangeTag } from '../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../video/tags/SubjectTag';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionEditButtonContainer from './CollectionEditButtonContainer';
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
          <Col xs={{ span: 24, order: 1 }} md={{ span: 19, order: 1 }}>
            <CollectionTitle
              title={this.props.collection.title}
              isPublic={this.props.collection.isPublic}
              isMine={this.props.collection.isMine}
            />
          </Col>
          <Col xs={{ span: 24, order: 3 }} md={{ span: 5, order: 2 }}>
            <CollectionEditButtonContainer
              className="collection-header__edit-button"
              collection={this.props.collection}
            />
          </Col>
          <Col xs={{ span: 24, order: 2 }} md={{ span: 24, order: 3 }}>
            <Row>
              {this.props.collection.subjects.map(subjectId => (
                <ConnectedSubjectTag key={subjectId} id={subjectId} />
              ))}
              {this.props.collection.ageRange && (
                <AgeRangeTag ageRange={this.props.collection.ageRange} />
              )}
            </Row>
            <Row>
              <CollectionSubtitle collection={this.props.collection} />
            </Row>
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
