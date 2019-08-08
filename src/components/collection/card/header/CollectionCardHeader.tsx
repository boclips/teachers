import { Col, Row } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { AgeRangeTag } from '../../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../video/tags/SubjectTag';
import BookmarkCollectionButton from '../../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../../buttons/CollectionButtonsContainer';
import '../../buttons/CollectionButtonsContainer.less';
import { CollectionSubtitle } from '../../CollectionSubtitle';
import CollectionCardTitle from './CollectionCardTitle';

interface Props {
  collection: VideoCollection;
  showPrivacy?: boolean;
  showAllSubjects?: boolean;
  showFullCard: boolean;
}

const hasAgeRange = (collection: VideoCollection) =>
  collection.ageRange.isBounded();
const hasSubjects = (collection: VideoCollection) =>
  collection.subjects.length > 0;

const hasValidTags = (collection: VideoCollection) =>
  hasAgeRange(collection) || hasSubjects(collection);

class CollectionCardHeader extends React.PureComponent<Props> {
  public render() {
    return (
      <>
        <Row type="flex" justify="space-between">
          <Col>
            <CollectionCardTitle
              collection={this.props.collection}
              showPrivacy={this.props.showPrivacy}
            />
            {this.props.showFullCard && (
              <CollectionSubtitle
                classname="highlight collection-subtitle"
                collection={this.props.collection}
              />
            )}
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
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
            <Row>
              {hasValidTags(this.props.collection) ? (
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
            </Row>
            <Row>
              <CollectionSubtitle collection={this.props.collection} />
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  private subjectsToDisplay = () => {
    return this.props.showAllSubjects
      ? this.props.collection.subjects
      : this.props.collection.subjects.slice(0, 1);
  };
}

export default CollectionCardHeader;
