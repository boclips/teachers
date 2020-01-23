import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import TextArea from 'antd/lib/input/TextArea';
import Checkbox from 'antd/lib/checkbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AgeRange } from '../../../types/AgeRange';
import { Range } from '../../../types/Range';
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

interface EditableFields {
  title: string;
  isPublic: boolean;
  subjects: string[];
  ageRange: Range;
  description: string;
}

interface Props extends FormComponentProps {
  collection: VideoCollection;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  disableButton: boolean;
}

export const EditCollectionForm = Form.create<Props>()((props: Props) => {
  const subjectsInStore = useSelector((state: State) => state.subjects);
  const { getFieldDecorator } = props.form;
  const dispatch = useDispatch();

  const handleOk = () => {
    props.form.validateFields((formErrors, values: EditableFields) => {
      if (formErrors) {
        return;
      }

      const changeRequest: EditCollectionRequest = {
        originalCollection: props.collection,
      };

      let shouldSubmitChanges = false;

      for (const key in values) {
        if (values.hasOwnProperty(key) && props.form.isFieldTouched(key)) {
          if (key === 'ageRange') {
            changeRequest[key] = new AgeRange(values[key].min, values[key].max);
          } else {
            changeRequest[key] = values[key];
          }

          shouldSubmitChanges = true;
        }
      }

      if (shouldSubmitChanges) {
        props.form.resetFields();
        dispatch(editCollectionAction(changeRequest));
      }

      props.setVisible(false);
    });
  };

  return (
    <Bodal
      title="Edit collection"
      visible={props.visible}
      onOk={handleOk}
      onCancel={() => {
        props.setVisible(false);
      }}
      okButtonProps={{
        size: 'large',
        loading: props.disableButton,
        disabled: props.disableButton,
      }}
      okText="Save"
      cancelButtonProps={{ size: 'large' }}
      closable={false}
      width={655}
      wrapClassName="edit-collection-modal"
      destroyOnClose={true}
    >
      <Form className="form-edit-collection">
        <Form.Item className="form__item">
          {getFieldDecorator('title', { initialValue: props.collection.title })(
            <Input data-qa="title-edit" />,
          )}
        </Form.Item>
        <Form.Item className="form__item">
          {getFieldDecorator('isPublic', {
            valuePropName: 'checked',
            initialValue: props.collection.isPublic,
          })(
            <Checkbox data-qa="visibility-edit">
              Public (anyone can see it)
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item className="form__item" label="Age">
          {getFieldDecorator('ageRange', {
            initialValue: props.collection.ageRange,
          })(<AgeRangeSlider ageRange={props.collection.ageRange} />)}
        </Form.Item>
        <SubjectsForm
          form={props.form}
          subjects={subjectsInStore}
          placeholder="Choose from our list.."
          initialValue={props.collection.subjects}
          label="Subjects"
        />
        <Form.Item className="form__item" label="Description">
          {getFieldDecorator('description', {
            initialValue: props.collection.description,
          })(
            <TextArea
              data-qa="description-edit"
              rows={3}
              placeholder="Enter a brief overview of the topic of your collection"
              className="form__item__textarea"
            />,
          )}
        </Form.Item>
      </Form>
    </Bodal>
  );
});
