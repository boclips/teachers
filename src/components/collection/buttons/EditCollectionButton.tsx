import React, { useState } from 'react';
import { Button } from 'antd';
import Icon from 'antd/lib/icon';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import EditCollectionSVG from 'resources/images/edit-collection.svg';
import { VideoCollection } from 'src/types/VideoCollection';
import { EditCollectionForm } from './EditCollectionForm';
import './EditCollectionButton.less';

interface Props {
  collection: VideoCollection;
}

export const EditCollectionButton = React.memo(({ collection }: Props) => {
  if (!collection.links.edit) {
    return null;
  }
  const [visible, setVisible] = useState(false);

  const disableButton = useSelector(
    (state: State) => state.collections.loading || state.collections.updating,
  );

  return (
    <React.Fragment>
      <Button
        size={'large'}
        onClick={() => {
          setVisible(true);
        }}
        className="collection-edit__button"
        data-qa="collection-edit-button"
        disabled={disableButton || visible}
      >
        <Icon
          theme="filled"
          aria-label="Edit collection"
          component={EditCollectionSVG}
        />
        Edit
      </Button>

      <EditCollectionForm
        collection={collection}
        visible={visible}
        setVisible={setVisible}
        disableButton={disableButton}
      />
    </React.Fragment>
  );
});
