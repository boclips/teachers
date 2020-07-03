import { Form } from '@ant-design/compatible';
import { Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { Country } from '../../../types/Country';
import MultiSelect from '../../common/MultiSelect';
import '../../common/MultiSelect.less';
import './CountriesForm.less';

export interface CountriesFormProps {
  countries: Country[];
  placeholder: string;
  label?: string;
  initialValue?: string;
  onCountryChange?: (value: Country) => void;
}

export const HIGHLIGHTED_COUNTRY_IDS = ['USA', 'GBR', 'AUS', 'CAN', 'IND'];

export class CountriesForm extends React.Component<
  FormComponentProps & CountriesFormProps
> {
  public onUpdateCountry = (value: string) => {
    this.props.form.setFieldsValue({ country: value });
    this.props.onCountryChange(
      this.props.countries.find((c) => c.id === value),
    );
  };

  private filterResults = () => (input, option) => {
    const matchByName =
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const matchByCode =
      option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    return matchByCode || matchByName;
  };

  private generateOptions() {
    const { Option } = MultiSelect;
    const orderedCountries: Country[] = [];
    const lastHighlightedCountryId =
      HIGHLIGHTED_COUNTRY_IDS[HIGHLIGHTED_COUNTRY_IDS.length - 1];

    if (this.props.countries) {
      const sortedCountries = this.props.countries.sort((a, b) =>
        a.name.localeCompare(b.name),
      );

      const countriesWithoutHighlights: Country[] = [];
      const countriesHighlighted: Country[] = [];

      sortedCountries.forEach((country) => {
        if (HIGHLIGHTED_COUNTRY_IDS.indexOf(country.id) > -1) {
          countriesHighlighted.push(country);
        } else {
          countriesWithoutHighlights.push(country);
        }
      });

      const countriesHighlightedOrdered = countriesHighlighted.sort((a, b) =>
        HIGHLIGHTED_COUNTRY_IDS.indexOf(a.id) >
        HIGHLIGHTED_COUNTRY_IDS.indexOf(b.id)
          ? 1
          : -1,
      );

      orderedCountries.push(...countriesHighlightedOrdered);
      orderedCountries.push(...countriesWithoutHighlights);
    }
    return orderedCountries?.map((country) => (
      <Option
        key={country.name}
        value={country.id}
        title={country.name}
        className={
          country.id === lastHighlightedCountryId ? 'highlight-border' : ''
        }
      >
        <span data-state={country.name} data-qa="country-option">
          {country.name}
        </span>
      </Option>
    ));
  }

  public render() {
    return (
      <Form.Item
        className="required form__item"
        label={this.props.label}
        colon={false}
      >
        {this.props.form.getFieldDecorator('country', {
          rules: [{ required: true, message: 'Please enter your country' }],
          initialValue: this.props.initialValue,
        })(
          <Select
            filterOption={this.filterResults()}
            placeholder={this.props.placeholder}
            showSearch
            size="large"
            onChange={this.onUpdateCountry}
            data-qa="countries-filter-select"
            dropdownClassName="dropdown"
            className="boclips-multi-select-selection"
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
