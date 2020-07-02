import { Form } from '@ant-design/compatible';

import { Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { UsaState } from '../../../types/UsaState';
import '../../common/MultiSelect.less';

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
    this.props.onStateChange(this.props.states.find((c) => c.id === value));
  };

  private filterResults = () => (input, option) =>
    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  private generateOptions() {
    const { Option } = Select;

    return (
      this.props.states &&
      this.props.states
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((state) => (
          <Option
            data-qa="state-option"
            key={state.id}
            value={state.id}
            title={state.name}
          >
            {state.name}
          </Option>
        ))
    );
  }

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label} colon={false}>
        {this.props.form.getFieldDecorator('state', {
          rules: [{ required: true, message: 'Please enter your state' }],
          initialValue: this.props.initialValue,
        })(
          <Select
            filterOption={this.filterResults()}
            placeholder={this.props.placeholder}
            showSearch
            className="boclips-multi-select-selection"
            size="large"
            onChange={this.onUpdateState}
            data-qa="states-filter-select"
            dropdownClassName="dropdown"
            /* eslint-disable-next-line */
            {...this.props}
          >
            {this.generateOptions()}
          </Select>,
        )}
      </Form.Item>
    );
  }
}
