import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import classnames from 'classnames';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import { ButtonMenu } from '../../common/buttons/ButtonMenu';
import StopClickPropagation from '../../common/StopClickPropagation';
import { AgeRangeTag } from '../../common/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../common/tags/SubjectTag';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../buttons/CollectionButtonsContainer';
import '../buttons/CollectionButtonsContainer.less';
import { CollectionSubtitle } from '../CollectionSubtitle';
import { LessonPlan } from '../lessonPlan/LessonPlan';
import { CollectionTitle } from './CollectionTitle';

import './CollectionHeader.less';

export interface Props {
  mode?: 'tiny-card' | 'card' | 'details';
  collection: VideoCollection;
}

class CollectionHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <React.Fragment>
        {this.renderTitleRow()}
        {this.renderSubtitleRow()}
        {this.renderDescriptionRow()}
      </React.Fragment>
    );
  }

  private renderTitleRow = () => (
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
          <span className="collection-header__bookmark-button">
            <ButtonMenu
              buttons={[
                <BookmarkCollectionButton collection={this.props.collection} />,
              ]}
            />
          </span>
          {this.props.mode !== 'tiny-card' && (
            <CollectionButtonsContainer
              collection={this.props.collection}
              className="collection-edit__card"
            />
          )}
        </StopClickPropagation>
      </Col>
    </Row>
  );

  private renderSubtitleRow = () => {
    const tags = this.shouldRenderTagContainer() && (
      <div className="tags-container">
        {this.subjectTagsToRender().map(subjectId => (
          <ConnectedSubjectTag key={subjectId} id={subjectId} />
        ))}
        {this.hasAgeRange() && (
          <AgeRangeTag ageRange={this.props.collection.ageRange.getLabel()} />
        )}
      </div>
    );

    const subtitle = this.props.mode !== 'tiny-card' && (
      <CollectionSubtitle
        classname={classnames('highlight collection-subtitle header', {
          'no-lesson-plan': this.props.mode === 'details',
        })}
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
    if (this.props.mode === 'tiny-card') {
      return null;
    }

    const lessonPlanToRender = this.getLessonPlan();

    return (
      <Row className="collection-header__description-row">
        <Col
          {...(lessonPlanToRender && {
            sm: { span: 24 },
            md: { span: 12 },
            lg: { span: 16 },
          })}
        >
          <div
            className={classnames('collection-header__description', {
              details: this.props.mode === 'details',
            })}
            data-qa="collection-description"
          >
            {this.props.collection.description}
          </div>
        </Col>
        {lessonPlanToRender && (
          <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <LessonPlan
              collectionId={this.props.collection.id}
              attachment={lessonPlanToRender}
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

  /**
   * We need to render the tag container when tiny-card, because we need to
   * keep vertical alignment for the video previews
   */
  private shouldRenderTagContainer = () =>
    this.props.mode === 'tiny-card' || this.hasAgeRange() || this.hasSubjects();

  private subjectTagsToRender = () =>
    this.props.mode === 'details'
      ? this.props.collection.subjects
      : this.props.collection.subjects.slice(0, 1);

  private getLessonPlan = () =>
    this.props.mode === 'details' &&
    this.props.collection.attachments.find(
      attachment => attachment.type === 'LESSON_PLAN',
    );

  private hasAgeRange = () => this.props.collection.ageRange.isBounded();
  private hasSubjects = () => this.props.collection.subjects.length > 0;
}

export default CollectionHeader;
