import { Form, Select } from 'antd';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { FormComponentProps } from './FormComponentProps';
import './SubjectsForm.less';

const Option = Select.Option;

interface SubjectsFormProps {
  subjects: Subject[];
}

export class SubjectsForm extends React.Component<
  FormComponentProps & SubjectsFormProps
> {
  public render() {
    return (
      <Form.Item>
        {this.props.form.getFieldDecorator('subjects', {
          rules: [{ type: 'array' }],
        })(
          <Select
            className={'subjects-selection'}
            mode="multiple"
            placeholder="Subject(s)"
            data-qa="subjects"
            size={'large'}
          >
            {this.generateOptions()}
          </Select>,
        )}
      </Form.Item>
    );
  }

  private generateOptions() {
    const options = [];
    this.props.subjects.forEach(subject => {
      options.push(
        <Option key={subject.id} value={subject.id}>
          {subject.name}
        </Option>,
      );
    });

    return options;
  }
}
