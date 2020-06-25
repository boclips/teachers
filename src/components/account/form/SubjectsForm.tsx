import { Form } from '@ant-design/compatible';

import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

interface SubjectsFormProps {
  subjects: Subject[];
  placeholder: string;
  label?: string;
  initialValue: string[];
}

export const SubjectsForm = (props: FormComponentProps & SubjectsFormProps) => (
  <Form.Item className="form__item" label={props.label} colon={false}>
    {props.form.getFieldDecorator('subjects', {
      rules: [{ type: 'array' }],
      initialValue: props.initialValue,
    })(
      <SelectSubjects
        subjects={props.subjects}
        placeholder={props.placeholder}
        label={props.label}
        data-qa="subject-select"
      />,
    )}
  </Form.Item>
);
