import { Select, Form } from 'antd';
import React from 'react';
import { Country } from '../../../types/Country';
import '../../common/MultiSelect.less';
import './CountriesForm.less';

export interface CountriesFormProps {
  formItemId: string;
  countries: Country[];
  onChange?: (value) => void;
}

export const HIGHLIGHTED_COUNTRY_IDS = ['USA', 'GBR', 'AUS', 'CAN', 'IND'];

export const CountriesForm = (props: CountriesFormProps) => {
  const filterResults = (input, option) => {
    const matchByName =
      option.title?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    const matchByCode =
      option.value?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    return matchByCode || matchByName;
  };

  const getById = (id: string) => props.countries.find((c) => c.id === id);

  const orderedCountries: Country[] = [];
  const lastHighlightedCountryId =
    HIGHLIGHTED_COUNTRY_IDS[HIGHLIGHTED_COUNTRY_IDS.length - 1];

  const sortedCountries = props.countries.sort((a, b) =>
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
  return (
    <Form.Item
      name={props.formItemId}
      className="required form__item"
      label="Country"
      colon={false}
      rules={[{ required: true, message: 'Please enter your country' }]}
    >
      <Select
        filterOption={filterResults}
        placeholder="Choose country"
        showSearch
        size="large"
        data-qa="countries-filter-select"
        dropdownClassName="dropdown"
        className="boclips-multi-select-selection"
        onChange={(id: string) => props.onChange(getById(id))}
      >
        {orderedCountries?.map((country) => (
          <Select.Option
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
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
