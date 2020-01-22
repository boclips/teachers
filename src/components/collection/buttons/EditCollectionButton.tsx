import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import Icon from 'antd/lib/icon';
import { useDispatch, useSelector } from 'react-redux';
import { WrappedFormUtils } from 'antd/es/form/Form';
import Bodal from '../../common/Bodal';
import State from '../../../types/State';
import EditCollectionSVG from '../../../../resources/images/edit-collection.svg';
import { VideoCollection } from '../../../types/VideoCollection';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../redux/actions/editCollectionAction';
import EditCollectionForm, { EditableFields } from './EditCollectionForm';
import './EditCollectionButton.less';

interface Props {
  collection: VideoCollection;
}

export const EditCollectionButton = React.memo(({ collection }: Props) => {
  if (!collection.links.edit) {
    return null;
  }
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const collectionEditFormRef = useRef(null);

  const disableButton = useSelector(
    (state: State) => state.collections.loading || state.collections.updating,
  );

  const handleOk = () => {
    const form: WrappedFormUtils = collectionEditFormRef.current.props.form;

    form.validateFields((formErrors, values: EditableFields) => {
      if (formErrors) {
        return;
      }

      const changeRequest: EditCollectionRequest = {
        originalCollection: collection,
      };

      let shouldSubmitChanges = false;

      for (const key in values) {
        if (values.hasOwnProperty(key) && form.isFieldTouched(key)) {
          changeRequest[key] = values[key];

          shouldSubmitChanges = true;
        }
      }

      if (shouldSubmitChanges) {
        form.resetFields();
        dispatch(editCollectionAction(changeRequest));
      }

      setVisible(false);
    });
  };

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
      <Bodal
        title="Edit collection"
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
        okButtonProps={{
          size: 'large',
          loading: disableButton,
          disabled: disableButton,
        }}
        okText="Save"
        cancelButtonProps={{ size: 'large' }}
        closable={false}
        width={655}
        wrapClassName="edit-collection-modal"
        destroyOnClose={true}
      >
        <EditCollectionForm
          title={collection.title}
          isPublic={collection.isPublic}
          subjects={collection.subjects}
          wrappedComponentRef={collectionEditFormRef}
          ageRange={collection.ageRange}
          description={collection.description}
        />
      </Bodal>
    </React.Fragment>
  );
});
