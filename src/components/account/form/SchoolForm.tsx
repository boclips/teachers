import { AutoComplete, Form, Select } from 'antd';
import React, {RefObject} from 'react';
import { searchSchools } from '../../../services/schools/searchSchools';
import { Country } from '../../../types/Country';
import { School } from '../../../types/School';
import { UsaState } from '../../../types/UsaState';
import MultiSelect from '../../common/MultiSelect';
import '../../common/MultiSelect.less';
import {FormInstance} from "antd/lib/form";

export const UNKNOWN_SCHOOL = '-1';

interface SchoolFormProps {
  formRef: RefObject<FormInstance>,
  country: Country;
  state?: UsaState;
  placeholder?: string;
  label?: string;
  initialValue?: School;
  allowUnknownSchools: boolean;
}

interface SchoolFormState {
  schools: School[];
  searchValue?: string;
}

export class SchoolForm extends React.Component<
  SchoolFormProps,
  SchoolFormState
> {
  public constructor(props: Readonly<SchoolFormProps>) {
    super(props);
    this.state = {
      schools: [],
      searchValue: null,
    };
  }

  public onUpdateSchool = (value: string) => {
    if (this.props.allowUnknownSchools) {
      this.props.formRef.current.setFieldsValue({ schoolName: value });
    } else {
      this.props.formRef.current.setFieldsValue({ schoolId: value });
    }
  };

  public onSearchSchool = searchValue => {
    if (searchValue) {
      searchSchools(searchValue, this.props.country, this.props.state).then(
        schools => {
          this.setState({
            schools,
            searchValue,
          });
        },
      );
    }
  };

  public render() {
    const {allowUnknownSchools, ...autoCompleteProps} = this.props;
    return this.props.allowUnknownSchools ? (
      <Form.Item
        className="form__item"
        label={this.props.label}
        colon={false}
        name="schoolName"
        rules={[{ required: true, message: 'Please enter your school' }]}
      >
        <AutoComplete
          dataSource={this.state.schools.map(s => s.name)}
          placeholder={this.props.placeholder}
          size={'large'}
          onSearch={this.onSearchSchool}
          onChange={this.onUpdateSchool}
          data-qa="school"
          dropdownClassName={'dropdown'}
          {...autoCompleteProps}
        />
      </Form.Item>
    ) : (
      <Form.Item
        className="form__item"
        label={this.props.label}
        name="schoolId"
        rules={[{ required: true, message: 'Please enter your school' }]}
      >
        <Select
          filterOption={false}
          placeholder={this.props.placeholder}
          onSearch={this.onSearchSchool}
          disabled={!this.props.state}
          showSearch={true}
          data-qa="school-filter-select"
          size={'large'}
          className={'boclips-multi-select-selection'}
          dropdownClassName={'dropdown'}
          notFoundContent={'Please type to search your school'}
          {...autoCompleteProps}
        >
          {this.generateOptions()}
        </Select>
      </Form.Item>
    );
  }

  private generateOptions = () => {
    const Option = MultiSelect.Option;
    let schools = [];
    if (this.state.schools) {
      schools = schools
        .concat(this.state.schools)
        .sort((a, b) => a.name.localeCompare(b.name));
    }
    if (this.state.searchValue && this.state.schools.length === 0) {
      schools.unshift({ id: UNKNOWN_SCHOOL, name: "My school isn't listed" });
    }

    return schools.map(school => (
      <Option key={school.id} value={school.id} title={school.name}>
        {school.name}
      </Option>
    ));
  };
}
