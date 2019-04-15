import { Form, Select } from 'antd';
import React from 'react';
import { Subject } from '../../../types/Subject';
import { FormComponentProps } from './FormComponentProps';
import './SubjectsForm.less';

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
          initialValue: [],
        })(
          <Select
            filterOption={this.filter}
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
    const Option = Select.Option;

    this.sortSubjectsByName();

    return this.props.subjects.map(subject => {
      return (
        <Option key={subject.name} value={subject.id} title={subject.name}>
          {subject.name}
        </Option>
      );
    });
  }

  private sortSubjectsByName() {
    this.props.subjects.sort((a: Subject, b: Subject) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  private filter(inputValue, option) {
    return option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}
