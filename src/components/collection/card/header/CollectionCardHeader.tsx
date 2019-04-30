import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import StopClickPropagation from '../../../common/StopClickPropagation';
import { ConnectedSubjectTag } from '../../../video/tags/SubjectTag';
import BookmarkingButton from './BookmarkCollectionButton';
import CollectionCardTitle from './CollectionCardTitle';
import RemoveCollectionButton from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  showRemoveButton: boolean;
}

const CollectionCardHeader = React.memo(
  ({ collection, showRemoveButton }: Props) => (
    <>
      <CollectionCardTitle collection={collection} />
      <StopClickPropagation>
        <BookmarkingButton collection={collection} />
        {showRemoveButton && <RemoveCollectionButton collection={collection} />}
      </StopClickPropagation>
      <div className="tags-container">
        {collection.subjects.length !== 0 && (
          <ConnectedSubjectTag id={collection.subjects[0]} />
        )}
      </div>
    </>
  ),
);

export default CollectionCardHeader;
