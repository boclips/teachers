import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { AgeRangeTag } from '../../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../video/tags/SubjectTag';
import BookmarkingButton from '../../buttons/bookmark/BookmarkCollectionButton';
import CollectionButtonsContainer from '../../buttons/CollectionButtonsContainer';
import '../../buttons/CollectionButtonsContainer.less';
import CollectionCardTitle from './CollectionCardTitle';

interface Props {
  collection: VideoCollection;
  showCollectionButtons: boolean;
  showTagsIfEmpty: boolean;
}

const hasAgeRange = (collection: VideoCollection) =>
  collection.ageRange.isBounded();
const hasSubjects = (collection: VideoCollection) =>
  collection.subjects.length > 0;

const hasValidTags = (collection: VideoCollection) =>
  hasAgeRange(collection) || hasSubjects(collection);

const CollectionCardHeader = React.memo(
  ({ collection, showCollectionButtons, showTagsIfEmpty }: Props) => (
    <>
      <CollectionCardTitle collection={collection} />
      <StopClickPropagation>
        <BookmarkingButton collection={collection} />
        {showCollectionButtons && (
          <CollectionButtonsContainer
            collection={collection}
            className="collection-edit__card "
          />
        )}
      </StopClickPropagation>
      {hasValidTags(collection) || showTagsIfEmpty ? (
        <div className="tags-container">
          {hasSubjects(collection) && (
            <StopClickPropagation>
              <ConnectedSubjectTag id={collection.subjects[0]} />
            </StopClickPropagation>
          )}
          {hasAgeRange(collection) && (
            <AgeRangeTag ageRange={collection.ageRange.getLabel()} />
          )}
        </div>
      ) : null}
    </>
  ),
);

export default CollectionCardHeader;
