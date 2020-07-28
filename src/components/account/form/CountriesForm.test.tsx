import { CountriesForm } from 'src/components/account/form/CountriesForm';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { CountryFactory } from 'test-support/factories';

describe('CountriesForm', () => {
  it('renders highlighted countries first, then sort the rest by abc', async () => {
    const testCountries = [
      CountryFactory.sample({ id: 'GBR', name: 'United Kingdom' }),
      CountryFactory.sample({ id: 'URY', name: 'Uruguay' }),
      CountryFactory.sample({ id: 'USA', name: 'United States' }),
      CountryFactory.sample({ id: 'DZA', name: 'Algeria' }),
      CountryFactory.sample({ id: 'HUN', name: 'Hungary' }),
      CountryFactory.sample({ id: 'TON', name: 'Tonga' }),
      CountryFactory.sample({ id: 'BEL', name: 'Belgium' }),
      CountryFactory.sample({ id: 'IND', name: 'India' }),
      CountryFactory.sample({ id: 'UZB', name: 'Uzbekistan' }),
      CountryFactory.sample({ id: 'CAN', name: 'Canada' }),
      CountryFactory.sample({ id: 'AUS', name: 'Australia' }),
    ];

    const expectedOrder = [
      'United States',
      'United Kingdom',
      'Australia',
      'Canada',
      'India',
      'Algeria',
      'Belgium',
      'Hungary',
      'Tonga',
      'Uruguay',
      'Uzbekistan',
    ];

    const component = render(
      <CountriesForm formItemId="test" countries={testCountries} />,
    );

    fireEvent.mouseDown(component.getByText('Choose country'));
    const options = await component.findAllByTestId('country-option');

    expectedOrder.forEach((countryName, index) => {
      expect(options[index].innerHTML).toEqual(countryName);
    });
  });
});
