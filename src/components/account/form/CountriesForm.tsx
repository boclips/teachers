import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Country } from '../../../types/Country';
import MultiSelect from '../../common/MultiSelect';

interface CountriesFormProps {
  countries: Country[];
  placeholder: string;
  label?: string;
  initialValue?: string;
}

export class CountriesForm extends React.Component<
  FormComponentProps & CountriesFormProps
> {
  public onUpdateCountry = (value: string[]) => {
    this.props.form.setFieldsValue({ country: value });
  };

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label}>
        {this.props.form.getFieldDecorator('country', {
          rules: [{ required: true }],
          initialValue: this.props.initialValue,
        })(
          <Select
            placeholder={this.props.placeholder}
            showSearch={true}
            size={'large'}
            onChange={this.onUpdateCountry}
            data-qa="countries-filter-select"
            dropdownClassName={'dropdown'}
            {...this.props}
          >
            {this.generateOptions()}
          </Select>,
        )}
      </Form.Item>
    );
  }

  private generateOptions() {
    const Option = MultiSelect.Option;

    return (
      this.props.countries &&
      this.props.countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(country => {
          return (
            <Option key={country.name} value={country.id} title={country.name}>
              {country.name}
            </Option>
          );
        })
    );
  }
}
