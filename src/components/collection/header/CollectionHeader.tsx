import { Card, Col, Row } from 'antd';
import { Skeleton as AntSkeleton } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import StopClickPropagation from '../../common/StopClickPropagation';
import { AgeRangeTag } from '../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../video/tags/SubjectTag';
import BookmarkCollectionButton from '../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../buttons/CollectionButtonsContainer';
import '../buttons/CollectionButtonsContainer.less';
import { CollectionSubtitle } from '../CollectionSubtitle';
import CollectionTitle from './CollectionTitle';

import './CollectionHeader.less';

interface Props {
  collection: VideoCollection;
  showPrivacy?: boolean;
  showAllSubjects?: boolean;
  showFullCard: boolean;
  showTagsContainerIfEmpty?: boolean;
}

const hasAgeRange = (collection: VideoCollection) =>
  collection.ageRange.isBounded();
const hasSubjects = (collection: VideoCollection) =>
  collection.subjects.length > 0;

const hasValidTags = (collection: VideoCollection) =>
  hasAgeRange(collection) || hasSubjects(collection);

class CollectionHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <>
        <Row
          type="flex"
          justify="space-between"
          className="collection-header__title-row"
        >
          <Col>
            <CollectionTitle
              collection={this.props.collection}
              showPrivacy={this.props.showPrivacy}
            />
          </Col>
          <Col>
            <StopClickPropagation>
              <span className="collection-header__bookmark-button">
                <BookmarkCollectionButton collection={this.props.collection} />
              </span>
              {this.props.showFullCard && (
                <CollectionButtonsContainer
                  collection={this.props.collection}
                  className="collection-edit__card"
                />
              )}
            </StopClickPropagation>
          </Col>
        </Row>
        <Row className="collection-header__row">
          {hasValidTags(this.props.collection) ||
          this.props.showTagsContainerIfEmpty ? (
            <div className="tags-container">
              {hasSubjects(this.props.collection) &&
                this.subjectsToDisplay().map(subjectId => {
                  return (
                    <StopClickPropagation wrapper="span" key={subjectId}>
                      <ConnectedSubjectTag id={subjectId} />
                    </StopClickPropagation>
                  );
                })}
              {hasAgeRange(this.props.collection) && (
                <AgeRangeTag
                  ageRange={this.props.collection.ageRange.getLabel()}
                />
              )}
            </div>
          ) : null}
          {this.props.showFullCard && (
            <CollectionSubtitle
              classname="highlight collection-subtitle header"
              collection={this.props.collection}
            />
          )}
        </Row>
        {this.props.showFullCard && (
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
        )}
      </>
    );
  }

  private subjectsToDisplay = () => {
    return this.props.showAllSubjects
      ? this.props.collection.subjects
      : this.props.collection.subjects.slice(0, 1);
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
}

export default CollectionHeader;
