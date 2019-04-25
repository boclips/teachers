import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import StopClickPropagation from '../../../common/StopClickPropagation';
import BookmarkingButton from './BookmarkCollectionButton';
import CollectionCardTitle from './CollectionCardTitle';
import RemoveCollectionButton from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  showRemoveButton: boolean;
}

const CollectionCardHeader = React.memo((props: Props) => (
  <>
    <CollectionCardTitle collection={props.collection} />
    <StopClickPropagation>
      <BookmarkingButton collection={props.collection} />
      {props.showRemoveButton && (
        <RemoveCollectionButton collection={props.collection} />
      )}
    </StopClickPropagation>
  </>
));

export default CollectionCardHeader;
