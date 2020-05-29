import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from 'src/types/VideoCollection';
import { CollectionButtonsContainer } from 'src/components/collection/buttons/CollectionButtonsContainer';
import { AttachmentDetails } from 'src/components/common/AttachmentDetails';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { getAttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { AgeRangeTag } from '../../../common/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../common/tags/SubjectTag';
import { CollectionTitle } from '../../title/CollectionTitle';
import { CollectionSubtitle } from '../../CollectionSubtitle';
import './CollectionHeader.less';

export interface Props {
  collection: VideoCollection;
  renderTitle?: boolean;
  renderSubtitle?: boolean;
  collectionUnits?: React.ReactNode;
}

export class CollectionHeader extends React.PureComponent<Props> {
  public static defaultProps = {
    renderTitle: true,
    renderSubtitle: true,
  };
  public render() {
    return (
      <React.Fragment>
        {this.renderTitleRow()}
        {this.renderSubtitleRow()}
        {this.renderDescriptionRow()}
      </React.Fragment>
    );
  }

  private renderTitleRow = () =>
    this.props.renderTitle && (
      <Row
        type="flex"
        justify="space-between"
        className="collection-header__title-row"
      >
        <Col>
          <CollectionTitle collection={this.props.collection} />
        </Col>
        <Col>
          <StopClickPropagation>
            <CollectionButtonsContainer collection={this.props.collection} />
          </StopClickPropagation>
        </Col>
      </Row>
    );

  private renderSubtitleRow = () => {
    const tags = this.shouldRenderTagContainer() && (
      <div className="tags-container" data-qa={'tags-container'}>
        {this.hasAgeRange() && (
          <AgeRangeTag ageRange={this.props.collection.ageRange} />
        )}
        {this.props.collection.subjects.map((subjectId) => (
          <ConnectedSubjectTag key={subjectId} id={subjectId} />
        ))}
      </div>
    );

    const subtitle = this.props.renderSubtitle && (
      <CollectionSubtitle
        classname={'highlight collection-subtitle header'}
        collection={this.props.collection}
      />
    );

    return (
      <Row className="collection-header__subtitle-row">
        {tags}
        {subtitle}
      </Row>
    );
  };

  private renderDescriptionRow = () => {
    const lessonGuideToRender = this.getLessonGuide();

    return (
      <Row
        className="collection-header__description-row"
        data-qa={'collection-description-row'}
      >
        <Col
          {...(lessonGuideToRender && {
            sm: { span: 24 },
            md: { span: 12 },
            lg: { span: 16 },
          })}
        >
          <div
            className={'collection-header__description details'}
            data-qa="collection-description"
          >
            {this.props.collection.description}
          </div>
          <div className={'collection-header__units'}>
            {this.props.collectionUnits}
          </div>
        </Col>
        {lessonGuideToRender && (
          <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <AttachmentDetails
              description={lessonGuideToRender.description}
              type={getAttachmentType(lessonGuideToRender.type)}
              link={lessonGuideToRender.links.download.getOriginalLink()}
              onClick={() => {
                AnalyticsFactory.externalAnalytics().trackCollectionAttachmentLinkVisited(
                  this.props.collection.id,
                  lessonGuideToRender,
                );

                AnalyticsFactory.internalAnalytics().trackCollectionInteractedWith(
                  this.props.collection,
                  'VISIT_LESSON_GUIDE',
                );
              }}
            />
          </Col>
        )}
      </Row>
    );
  };

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

  private shouldRenderTagContainer = () =>
    this.hasAgeRange() || this.hasSubjects();

  private getLessonGuide = () =>
    this.props.collection.attachments.find(
      (attachment) => attachment.type === 'LESSON_PLAN',
    );

  private hasAgeRange = () => this.props.collection.ageRange.isBounded();
  private hasSubjects = () => this.props.collection.subjects.length > 0;
}
