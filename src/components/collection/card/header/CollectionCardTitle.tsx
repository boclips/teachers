import React from 'react';
import { VideoCollection } from '../../../../types/VideoCollection';
import './CollectionCardTitle.less';

interface Props {
  collection: VideoCollection;
}

const CollectionCardTitle = React.memo((props: Props) => (
  <>
    <h1
      className="collection-card-title collection-card-title--clamp-2-lines"
      data-qa="collection-title"
      role="button"
      tabIndex={0}
    >
      {props.collection.title}
    </h1>
  </>
));

export default CollectionCardTitle;
