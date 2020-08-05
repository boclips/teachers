import { Checkbox, Form } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import React from 'react';
import { formatCount } from 'src/components/searchResults/filters/utils/formatCount';
import { FormItemProps } from 'antd/es/form';

export interface CheckboxGroupFilterProps {
  filterOptions: FilterOptionResult[];
  formItemProps?: FormItemProps;
}

interface FilterOptionResult {
  value: any;
  label: string;
  count: number;
}

export const CheckboxGroupFilter = ({
  filterOptions,
  formItemProps,
}: CheckboxGroupFilterProps) => (
  <Form.Item
    name={formItemProps.name}
    rules={formItemProps.rules}
    initialValue={formItemProps.initialValue}
  >
    <CheckboxGroup className="filter-form__checkbox-group">
      {filterOptions
        .filter((filter) => filter.count > 0)
        .map((item) => (
          <Checkbox key={item.label} value={item.value}>
            {item.label}{' '}
            <span className="filter-form__checkbox-count">
              ({formatCount(item.count)})
            </span>
          </Checkbox>
        ))}
    </CheckboxGroup>
  </Form.Item>
);
