import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { Country } from 'src/types/Country';
import MultiSelect from '../../common/MultiSelect';
import '../../common/MultiSelect.less';

interface CountriesFormProps {
  countries: Country[];
  placeholder: string;
  label?: string;
  initialValue?: string;
  onCountryChange?: (value: Country) => void;
}

export class CountriesForm extends React.Component<
  FormComponentProps & CountriesFormProps
> {
  public onUpdateCountry = (value: string) => {
    this.props.form.setFieldsValue({ country: value });
    this.props.onCountryChange(this.props.countries.find(c => c.id === value));
  };

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label} colon={false}>
        {this.props.form.getFieldDecorator('country', {
          rules: [{ required: true, message: 'Please enter your country' }],
          initialValue: this.props.initialValue,
        })(
          <Select
            filterOption={this.filterResults()}
            placeholder={this.props.placeholder}
            showSearch={true}
            size={'large'}
            onChange={this.onUpdateCountry}
            data-qa="countries-filter-select"
            dropdownClassName={'dropdown'}
            className={'boclips-multi-select-selection'}
            {...this.props}
          >
            {this.generateOptions()}
          </Select>,
        )}
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
