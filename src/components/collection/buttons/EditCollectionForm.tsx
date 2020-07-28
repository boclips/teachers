import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Button from 'antd/lib/button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AgeRangeSelect } from 'src/components/ageRanges/AgeRangeSelect';
import { AgeRange } from 'src/types/AgeRange';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import './EditCollectionForm.less';
import Bodal from '../../common/Bodal';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../redux/actions/editCollectionAction';
import { VideoCollection } from '../../../types/VideoCollection';
import { RemoveCollectionButton } from './RemoveCollectionButton';

interface Props {
  collection: VideoCollection;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  disableButton: boolean;
}

export const EditCollectionForm = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    form.validateFields().then((values) => {
      const changeRequest: EditCollectionRequest = {
        collection: props.collection,
        changes: {},
      };

      let shouldSubmitChanges = false;

      for (const key in values) {
        if (
          // https://eslint.org/docs/rules/no-prototype-builtins#top
          Object.prototype.hasOwnProperty.call(values, key) &&
          form.isFieldTouched(key)
        ) {
          changeRequest.changes[key] = values[key];

          shouldSubmitChanges = true;
        }
      }
      if (
        ageRange.min !== props.collection.ageRange.resolveMin() ||
        ageRange.max !== props.collection.ageRange.resolveMax()
      ) {
        changeRequest.changes.ageRange = new AgeRange(
          ageRange.min,
          ageRange.max,
        );
        shouldSubmitChanges = true;
      }

      if (shouldSubmitChanges) {
        form.resetFields();
        dispatch(editCollectionAction(changeRequest));
      }

      props.setVisible(false);
    });
  };

  const [ageRange, setAgeRange] = useState({
    min: props.collection.ageRange.isBounded()
      ? props.collection.ageRange.resolveMin()
      : null,
    max: props.collection.ageRange.isBounded()
      ? props.collection.ageRange.resolveMax()
      : null,
    validateStatus: null,
    errorMsg: null,
  });

  const onAgeRangeChange = (value: Partial<AgeRange>) => {
    setAgeRange({
      ...ageRange,
      ...value,
      ...validateAgeRange(value),
    });
  };

  const validateAgeRange = (value) => {
    if (!ageRange.min && value.max) {
      return {
        validateStatus: 'error',
        errorMsg: 'Cannot set a maximum without a minimum!',
      };
    }
    return {
      validateStatus: 'success',
      errorMsg: null,
    };
  };

  return (
    <Bodal
      title="Edit collection"
      visible={props.visible}
      footer={[
        <RemoveCollectionButton
          onOpen={() => props.setVisible(false)}
          onClose={() => props.setVisible(true)}
          collection={props.collection}
          key="remove"
        />,
        <Button
          key="close"
          onClick={() => {
            props.setVisible(false);
          }}
          size="large"
          loading={props.disableButton}
          disabled={props.disableButton}
        >
          Cancel
        </Button>,
        <Button
          key="save"
          onClick={handleOk}
          size="large"
          type="primary"
          loading={props.disableButton}
          disabled={props.disableButton}
        >
          Save
        </Button>,
      ]}
      closable={false}
      width={655}
      wrapClassName="edit-collection-modal"
      destroyOnClose
    >
      <Form className="form-edit-collection" form={form}>
        <Form.Item
          className="form__item"
          name="title"
          initialValue={props.collection.title}
        >
          <Input data-qa="title-edit" />
        </Form.Item>
        <Form.Item
          className="form__item"
          label="Age"
          validateStatus={ageRange.validateStatus}
          help={ageRange.errorMsg}
        >
          <AgeRangeSelect
            onChange={onAgeRangeChange}
            minValue={ageRange?.min}
            maxValue={ageRange?.max}
          />
        </Form.Item>
        <SubjectsForm
          formItemId="subjects"
          label="Subjects"
          placeholder="Choose from our list.."
          initialValue={props.collection.subjects}
        />
        <Form.Item
          className="form__item"
          label="Description"
          name="description"
          initialValue={props.collection.description}
        >
          <TextArea
            data-qa="description-edit"
            rows={3}
            placeholder="Enter a brief overview of the topic of your collection"
            className="form__item__textarea"
          />
        </Form.Item>
      </Form>
    </Bodal>
  );
};
