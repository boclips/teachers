import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { AgeRangeTag } from '../../../video/tags/AgeRangeTag';
import { ConnectedSubjectTag } from '../../../video/tags/SubjectTag';
import BookmarkingButton from '../../buttons/bookmark/BookmarkCollectionButton';
import CollectionCardTitle from './CollectionCardTitle';
import RemoveCollectionButton from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  showRemoveButton: boolean;
  showTagsIfEmpty: boolean;
}

const hasAgeRange = (collection: VideoCollection) =>
  collection.ageRange && true;
const hasSubjects = (collection: VideoCollection) =>
  collection.subjects.length > 0;

const hasValidTags = (collection: VideoCollection) =>
  hasAgeRange(collection) || hasSubjects(collection);

const CollectionCardHeader = React.memo(
  ({ collection, showRemoveButton, showTagsIfEmpty }: Props) => (
    <>
      <CollectionCardTitle collection={collection} />
      <StopClickPropagation>
        <BookmarkingButton collection={collection} />
        {showRemoveButton && <RemoveCollectionButton collection={collection} />}
      </StopClickPropagation>
      {hasValidTags(collection) || showTagsIfEmpty ? (
        <div className="tags-container">
          {hasSubjects(collection) && (
            <ConnectedSubjectTag id={collection.subjects[0]} />
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
