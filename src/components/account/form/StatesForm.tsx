import { Form, Select } from 'antd';
import {FormInstance} from "antd/lib/form";
import React, {RefObject} from 'react';
import { UsaState } from '../../../types/UsaState';
import '../../common/MultiSelect.less';

interface StatesFormProps {
  formRef: RefObject<FormInstance>,
  states: UsaState[];
  placeholder?: string;
  label?: string;
  // todo(AO): remove
  initialValue?: string;
  // todo(AO): remove
  onStateChange?: (value: UsaState) => void;
}

export class StatesForm extends React.Component<
   StatesFormProps
> {
  public onUpdateState = (value: string) => {
    this.props.formRef.current.setFieldsValue({ state: value });
    this.props.onStateChange(this.props.states.find(c => c.id === value));
  };

  public render() {
    const {formRef, initialValue, onStateChange, ...selectProps} = this.props;
    return (
      <Form.Item
        className="form__item"
        label={this.props.label}
        colon={false}
        name="state"
        rules={[{ required: true, message: 'Please enter your state' }]}
      >
        <Select
          filterOption={this.filterResults()}
          placeholder={this.props.placeholder}
          showSearch={true}
          className={'boclips-multi-select-selection'}
          size={'large'}
          onChange={this.onUpdateState}
          data-qa="states-filter-select"
          dropdownClassName={'dropdown'}
          {...selectProps}
        >
          {this.generateOptions()}
        </Select>
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
        .map(state => (
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
}
