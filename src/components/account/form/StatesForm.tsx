import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { UsaState } from '../../../types/UsaState';

interface StatesFormProps {
  states: UsaState[];
  placeholder?: string;
  label?: string;
  initialValue?: string;
  onStateChange?: (value: UsaState) => void;
}

export class StatesForm extends React.Component<
  FormComponentProps & StatesFormProps
> {
  public onUpdateState = (value: string) => {
    this.props.form.setFieldsValue({ state: value });
    this.props.onStateChange(this.props.states.find(c => c.id === value));
  };

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label}>
        {this.props.form.getFieldDecorator('state', {
          rules: [{ required: true, message: 'Please enter your state' }],
          initialValue: this.props.initialValue,
        })(
          <Select
            filterOption={this.filterResults()}
            placeholder={this.props.placeholder}
            showSearch={true}
            size={'large'}
            onChange={this.onUpdateState}
            data-qa="states-filter-select"
            dropdownClassName={'dropdown'}
            {...this.props}
          >
            {this.generateOptions()}
          </Select>,
        )}
      </Form.Item>
    );
  }

  private filterResults() {
    return (input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }

  private generateOptions() {
    const Option = Select.Option;

    return (
      this.props.states &&
      this.props.states
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(state => {
          return (
            <Option
              data-qa="state-option"
              key={state.id}
              value={state.id}
              title={state.name}
            >
              {state.name}
            </Option>
          );
        })
    );
  }
}
