import { Button } from 'antd';
import React from 'react';

interface Props {
  onRemove: () => void;
}

export const VideoCollectionRemoveButton = React.memo((props: Props) => (
  <Button
    className="toggle-collection-button"
    data-qa="remove-from-default-collection"
    onClick={props.onRemove}
    size={'large'}
  >
    Remove
  </Button>
));
