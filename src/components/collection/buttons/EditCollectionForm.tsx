import { Form, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Checkbox from 'antd/lib/checkbox';
import Button from 'antd/lib/button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/lib/form/Form';
import State from '../../../types/State';
import { SubjectsForm } from '../../account/form/SubjectsForm';
import { AgeRangeSlider } from '../../common/AgeRangeSlider';
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
  const subjectsInStore = useSelector((state: State) => state.subjects);
  const dispatch = useDispatch();
  const [form] = useForm();

  const handleFormFinish = values => {
    const changeRequest: EditCollectionRequest = {
      collection: props.collection,
      changes: {},
    };

    let shouldSubmitChanges = false;

    for (const key in values) {
      if (values.hasOwnProperty(key) && form.isFieldTouched(key)) {
        changeRequest.changes[key] = values[key];

        shouldSubmitChanges = true;
      }
    }

    if (shouldSubmitChanges) {
      form.resetFields();
      dispatch(editCollectionAction(changeRequest));
    }

    props.setVisible(false);
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
          htmlType="submit"
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
      destroyOnClose={true}
    >
      <Form
        form={form}
        onFinish={handleFormFinish}
        className="form-edit-collection"
        initialValues={{
          title: props.collection.title,
          isPublic: props.collection.isPublic,
          ageRange: props.collection.ageRange,
          subjects: props.collection.subjects,
          description: props.collection.description,
        }}
      >
        <Form.Item className="form__item" name="title">
          <Input data-qa="title-edit" />
        </Form.Item>
        <Form.Item
          className="form__item"
          name="isPublic"
          valuePropName="checked"
        >
          <Checkbox data-qa="visibility-edit">
            Public (anyone can see it)
          </Checkbox>
        </Form.Item>
        <Form.Item className="form__item" label="Age" name="ageRange">
          <AgeRangeSlider ageRange={props.collection.ageRange} />
        </Form.Item>
        <SubjectsForm
          subjects={subjectsInStore}
          placeholder="Choose from our list.."
          label="Subjects"
        />
        <Form.Item
          className="form__item"
          label="Description"
          name="description"
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
