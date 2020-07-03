import { Card, Col, Row, Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from 'src/types/VideoCollection';
import { CollectionButtonsContainer } from 'src/components/collection/buttons/CollectionButtonsContainer';
import { AttachmentDetails } from 'src/components/common/AttachmentDetails';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { getAttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import { getAttachmentLabels } from 'src/components/common/AttachmentConstants';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { AgeRangeTag } from '../../../common/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../common/tags/SubjectTag';
import { CollectionTitle } from '../../title/CollectionTitle';
import { CollectionSubtitle } from '../../CollectionSubtitle';
import './CollectionHeader.less';

export interface Props {
  collection: VideoCollection;
  isParent?: boolean;
  collectionUnits?: React.ReactNode;
}

export class CollectionHeader extends React.PureComponent<Props> {
  public static defaultProps = {
    renderTitle: true,
    renderSubtitle: true,
  };

  public static Skeleton = () => (
    <section className="collection-header__skeleton">
      <Card className="video-card" bordered={false}>
        <AntSkeleton loading title paragraph active />
      </Card>
    </section>
  );

  private shouldRenderTagContainer = () =>
    this.hasAgeRange() || this.hasSubjects();

  private getAttachment = () => this.props.collection.attachments?.[0];

  private hasAgeRange = () => this.props.collection.ageRange.isBounded();

  private hasSubjects = () => this.props.collection.subjects.length > 0;

  private renderTitleRow = (elements: React.ReactNode[]) => (
    <Row justify="space-between" className="collection-header__title-row">
      {elements.map((elem) => elem)}
    </Row>
  );

  private renderSubtitleRow = (elements: React.ReactNode[]) => (
    <Row className="collection-header__subtitle-row">
      {elements.map((elem) => elem)}
    </Row>
  );

  private renderTags = () =>
    this.shouldRenderTagContainer() && (
      <div className="tags-container" data-qa="tags-container" key="tags">
        {this.hasAgeRange() && (
          <AgeRangeTag ageRange={this.props.collection.ageRange} />
        )}
        {this.props.collection.subjects.map((subjectId) => (
          <ConnectedSubjectTag key={subjectId} id={subjectId} />
        ))}
      </div>
    );

  private renderAdditionalInfo = () => (
    <CollectionSubtitle
      classname="highlight collection-subtitle header"
      collection={this.props.collection}
      key="subtitle"
    />
  );

  private renderTitle = () => (
    <Col key="title">
      <CollectionTitle collection={this.props.collection} />
    </Col>
  );

  private renderButtons = () => (
    <Col key="buttons">
      <StopClickPropagation>
        <CollectionButtonsContainer collection={this.props.collection} />
      </StopClickPropagation>
    </Col>
  );

  private renderDescriptionRow = () => {
    const attachmentToRender = this.getAttachment();

    return (
      <Row
        className="collection-header__description-row"
        data-qa="collection-description-row"
      >
        <Col
          sm={attachmentToRender && { span: 24 }}
          md={attachmentToRender && { span: 12 }}
          lg={attachmentToRender && { span: 16 }}
          key="header"
        >
          <div
            key="div-description"
            className="collection-header__description details"
            data-qa="collection-description"
          >
            {this.props.collection.description}
          </div>
          <div key="div-units" className="collection-header__units">
            {this.props.collectionUnits}
          </div>
        </Col>
        {attachmentToRender && (
          <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <AttachmentDetails
              description={attachmentToRender.description}
              labels={getAttachmentLabels(
                getAttachmentType(attachmentToRender.type),
              )}
              link={attachmentToRender.links.download.getOriginalLink()}
              onClick={() => {
                AnalyticsFactory.externalAnalytics().trackCollectionAttachmentLinkVisited(
                  this.props.collection.id,
                  attachmentToRender,
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

  public renderSimpleCollectionHeader() {
    return (
      <>
        {this.renderTitleRow([this.renderTitle(), this.renderButtons()])}
        {this.renderSubtitleRow([
          this.renderTags(),
          this.renderAdditionalInfo(),
        ])}
        {this.renderDescriptionRow()}
      </>
    );
  }

  public renderParentCollectionHeader() {
    return (
      <>
        {this.renderTitleRow([<Col />, this.renderButtons()])}
        {this.renderSubtitleRow([this.renderTags()])}
        {this.renderDescriptionRow()}
      </>
    );
  }

  public render() {
    return this.props.isParent
      ? this.renderParentCollectionHeader()
      : this.renderSimpleCollectionHeader();
  }
}
