import { AutoComplete, Select, Form } from 'antd';
import React, { useState } from 'react';
import sortBy from 'lodash/sortBy';
import { searchSchools } from 'src/services/schools/searchSchools';
import { Country } from 'src/types/Country';
import { UsaState } from 'src/types/UsaState';
import '../../common/MultiSelect.less';

export const UNKNOWN_SCHOOL = '-1';

interface SchoolFormProps {
  formItemId: string;
  country: Country;
  state?: UsaState;
  allowUnknownSchools?: boolean;
}

export const SchoolForm = (props: SchoolFormProps) => {
  const [schools, setSchools] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const onSearchSchool = (value) => {
    if (value) {
      searchSchools(value, props.country, props.state).then((foundSchools) => {
        const sortedSchools = sortBy(foundSchools, 'name');
        setSchools(sortedSchools);
        setSearchValue(value);
      });
    }
  };

  const generateOptions = () => {
    const schoolOptions = schools;
    if (searchValue && schools.length === 0) {
      schoolOptions.unshift({
        id: UNKNOWN_SCHOOL,
        name: "My school isn't listed",
      });
    }

    return schoolOptions.map((school) => (
      <Select.Option
        key={school.id}
        value={school.id}
        data-qa="school-option"
        title={school.name}
      >
        {school.name}
      </Select.Option>
    ));
  };

  return props.allowUnknownSchools ? (
    <Form.Item
      name={props.formItemId}
      className="required form__item"
      label="School"
      htmlFor="school-autocomplete"
      colon={false}
      rules={[{ required: true, message: 'Please enter your school' }]}
    >
      <AutoComplete
        options={schools.map((s) => ({ value: s.name }))}
        placeholder="Enter the name of your school"
        size="large"
        onSearch={onSearchSchool}
        data-qa="school"
        id="school-autocomplete"
        dropdownClassName="dropdown"
      />
    </Form.Item>
  ) : (
    <Form.Item
      name={props.formItemId}
      className="required form__item"
      label="School"
      htmlFor="school-filter-select"
      rules={[{ required: true, message: 'Please enter your school' }]}
    >
      <Select
        filterOption={false}
        placeholder="Enter the name of your school"
        onSearch={onSearchSchool}
        disabled={!props.state}
        showSearch
        data-qa="school-filter-select"
        id="school-filter-select"
        size="large"
        dropdownClassName="dropdown"
        notFoundContent="Please type to search your school"
        optionLabelProp="title"
      >
        {generateOptions()}
      </Select>
    </Form.Item>
  );
};
