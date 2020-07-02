import { Checkbox, Form } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import React from 'react';
import { GetFieldDecoratorOptions } from 'antd/es/form/Form';
import { FormComponentProps } from 'antd/lib/form';
import { formatCount } from 'src/components/searchResults/filters/utils/formatCount';

export interface CheckboxGroupFilterProps {
  filterOptions: FilterOptionResult[];
  form;
  fieldId: string;
  fieldOptions: GetFieldDecoratorOptions;
}

interface FilterOptionResult {
  value: any;
  label: string;
  count: number;
}

export const CheckboxGroupFilter = ({
  filterOptions,
  fieldId,
  form,
  fieldOptions,
}: CheckboxGroupFilterProps & FormComponentProps) => (
  <React.Fragment>
    <Form.Item>
      {form.getFieldDecorator(
        fieldId,
        fieldOptions,
      )(
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
        </CheckboxGroup>,
      )}
    </Form.Item>
  </React.Fragment>
);
