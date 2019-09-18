import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

interface SubjectsFormProps {
  subjects: Subject[];
  placeholder: string;
  label?: string;
  initialValue: string[];
}

export class SubjectsForm extends React.Component<
  FormComponentProps & SubjectsFormProps
> {
  public onUpdateSubjects = (value: string[]) => {
    this.props.form.setFieldsValue({ subjects: value });
  };

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label}>
        {this.props.form.getFieldDecorator('subjects', {
          rules: [{ type: 'array' }],
          initialValue: this.props.initialValue,
        })(
          <SelectSubjects
            subjects={this.props.subjects}
            placeholder={this.props.placeholder}
            label={this.props.label}
            onUpdateSubjects={this.onUpdateSubjects}
            initialValue={this.props.initialValue}
            data-qa="subject-select"
          />,
        )}
      </Form.Item>
    );
  }
}
