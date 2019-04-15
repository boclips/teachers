import { Form } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { SelectSubjects } from '../../subject/SelectSubjects';
import { FormComponentProps } from './FormComponentProps';
import './SubjectsForm.less';

interface SubjectsFormProps {
  subjects: Subject[];
}

export class SubjectsForm extends React.Component<
  FormComponentProps & SubjectsFormProps
> {
  public onUpdateSubjects = (value: SelectValue) => {
    this.props.form.setFieldsValue({ subjects: value });
  };

  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('subjects', {
          rules: [{ type: 'array' }],
          initialValue: [],
        })(
          <SelectSubjects
            subjects={this.props.subjects}
            onUpdateSubjects={this.onUpdateSubjects}
          />,
        )}
      </Form.Item>
    );
  }
}
