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
  showTagsContainerIfEmpty?: boolean;
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
          <Row>
            <Col md={{ span: 20 }}>
              <CollectionCardTitle
                collection={this.props.collection}
                showPrivacy={this.props.showPrivacy}
              />
            </Col>
            <Col md={{ span: 4 }}>
              <StopClickPropagation>
                <span className="collection-header__bookmark-button">
                  <BookmarkCollectionButton
                    collection={this.props.collection}
                  />
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
          <Col xs={{ span: 24 }} md={{ span: 24 }}>
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
          </Col>
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
