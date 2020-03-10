import { Form } from 'antd';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

interface SubjectsFormProps {
  subjects: Subject[];
  placeholder: string;
  label?: string;
}

export const SubjectsForm = (props: SubjectsFormProps) => (
  <Form.Item
    className="form__item"
    label={props.label}
    colon={false}
    name="subjects"
    rules={[{ type: 'array' }]}
  >
    <SelectSubjects
      subjects={props.subjects}
      placeholder={props.placeholder}
      label={props.label}
      data-qa="subject-select"
    />
  </Form.Item>
);
