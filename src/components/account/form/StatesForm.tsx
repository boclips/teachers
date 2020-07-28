import { Select, Form } from 'antd';
import React from 'react';
import { UsaState } from '../../../types/UsaState';
import '../../common/MultiSelect.less';

interface StatesFormProps {
  formItemId: string;
  states: UsaState[];
  onChange: (value) => void;
}

export const StatesForm = (props: StatesFormProps) => {
  const filterResults = (input, option) =>
    option.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const getById = (id: string) => props.states.find((state) => state.id === id);

  const generateOptions = () => {
    return (
      props.states &&
      props.states
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((state) => (
          <Select.Option
            data-qa="state-option"
            key={state.id}
            value={state.id}
            title={state.name}
          >
            {state.name}
          </Select.Option>
        ))
    );
  };

  return (
    <Form.Item
      className="required form__item"
      label="State"
      htmlFor="states-filter-select"
      colon={false}
      name={props.formItemId}
      rules={[{ required: true, message: 'Please enter your state' }]}
    >
      <Select
        filterOption={filterResults}
        placeholder="Choose state"
        showSearch
        className="boclips-multi-select-selection"
        size="large"
        data-qa="states-filter-select"
        id="states-filter-select"
        dropdownClassName="dropdown"
        onChange={(id: string) => props.onChange(getById(id))}
      >
        {generateOptions()}
      </Select>
    </Form.Item>
  );
};
