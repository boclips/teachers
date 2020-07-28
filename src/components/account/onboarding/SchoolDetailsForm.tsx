import { CountriesForm } from 'src/components/account/form/CountriesForm';
import { StatesForm } from 'src/components/account/form/StatesForm';
import { SchoolForm } from 'src/components/account/form/SchoolForm';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import State from 'src/types/State';
import { fetchCountriesAction } from 'src/components/account/onboarding/redux/actions/fetchCountriesAction';
import { Country } from 'src/types/Country';
import { UsaState } from 'src/types/UsaState';

interface Props {
  countryFormItemId: string;
  stateFormItemId: string;
  schoolNameFormItemId: string;
  schoolIdFormItemId: string;
  role?: string;
}
export const SchoolDetailsForm = (props: Props) => {
  const dispatch = useDispatch();

  const allCountries = useSelector((state: State) => state.countries);
  const [country, setCountry] = useState<Country>(null);
  const [usaState, setUsaState] = useState<UsaState>(null);

  useEffect(() => {
    if (!allCountries || allCountries.length === 0) {
      dispatch(fetchCountriesAction());
    }
  }, [dispatch, allCountries]);
  return (
    <>
      <CountriesForm
        formItemId={props.countryFormItemId}
        countries={allCountries}
        onChange={setCountry}
      />
      {props.role !== 'PARENT' && country !== null ? (
        country.id === 'USA' ? (
          <section>
            <StatesForm
              formItemId={props.stateFormItemId}
              states={country.states}
              onChange={setUsaState}
            />
            <SchoolForm
              formItemId={props.schoolIdFormItemId}
              country={country}
              state={usaState}
              allowUnknownSchools={false}
            />
          </section>
        ) : (
          <section>
            <SchoolForm
              formItemId={props.schoolNameFormItemId}
              country={country}
              allowUnknownSchools
            />
          </section>
        )
      ) : (
        <></>
      )}
    </>
  );
};
