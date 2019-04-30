import { Form } from 'antd';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';
import { FormComponentProps } from './FormComponentProps';

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
      <Form.Item>
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
          />,
        )}
      </Form.Item>
    );
  }
}
