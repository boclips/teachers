import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import React, { RefObject } from 'react';
import { Country } from '../../../types/Country';
import MultiSelect from '../../common/MultiSelect';
import '../../common/MultiSelect.less';

interface CountriesFormProps {
  countries: Country[];
  placeholder: string;
  label?: string;
  initialValue?: string;
  onCountryChange?: (value: Country) => void;
  formRef: RefObject<FormInstance>;
}

export class CountriesForm extends React.Component<CountriesFormProps> {
  public onUpdateCountry = (value: string) => {
    this.props.formRef.current.setFieldsValue({ country: value });
    this.props.onCountryChange(this.props.countries.find(c => c.id === value));
  };

  public render() {
    const {onCountryChange,formRef, ...selectProps} = this.props;
    return (
      <Form.Item
        className="form__item"
        label={this.props.label}
        colon={false}
        name="country"
        rules={[{ required: true, message: 'Please enter your country' }]}
      >
        <Select
          filterOption={this.filterResults()}
          placeholder={this.props.placeholder}
          showSearch={true}
          size={'large'}
          onChange={this.onUpdateCountry}
          data-qa="countries-filter-select"
          dropdownClassName={'dropdown'}
          className={'boclips-multi-select-selection'}
          {...selectProps}
        >
          {this.generateOptions()}
        </Select>
      </Form.Item>
    );
  }

  private filterResults() {
    return (input, option) => {
      const matchByName =
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      const matchByCode =
        option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      return matchByCode || matchByName;
    };
  }

  private generateOptions() {
    const Option = MultiSelect.Option;

    return (
      this.props.countries &&
      this.props.countries
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(country => (
          <Option key={country.name} value={country.id} title={country.name}>
            {country.name}
          </Option>
        ))
    );
  }
}
