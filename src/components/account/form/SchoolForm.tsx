import { Form } from '@ant-design/compatible';

import { AutoComplete, Select } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { searchSchools } from '../../../services/schools/searchSchools';
import { Country } from '../../../types/Country';
import { School } from '../../../types/School';
import { UsaState } from '../../../types/UsaState';
import MultiSelect from '../../common/MultiSelect';
import '../../common/MultiSelect.less';

export const UNKNOWN_SCHOOL = '-1';

interface SchoolFormProps {
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
  FormComponentProps & SchoolFormProps,
  SchoolFormState
> {
  public constructor(props: Readonly<FormComponentProps & SchoolFormProps>) {
    super(props);
    this.state = {
      schools: [],
      searchValue: null,
    };
  }

  public onUpdateSchool = (value: string) => {
    if (this.props.allowUnknownSchools) {
      this.props.form.setFieldsValue({ schoolName: value });
    } else {
      this.props.form.setFieldsValue({ schoolId: value });
    }
  };

  public onSearchSchool = (searchValue) => {
    if (searchValue) {
      searchSchools(searchValue, this.props.country, this.props.state).then(
        (schools) => {
          this.setState({
            ...this.state,
            schools,
            searchValue,
          });
        },
      );
    }
  };

  public componentDidUpdate(prevProps: FormComponentProps) {
    if (
      this.props.form.getFieldValue('schoolId') !==
        prevProps.form.getFieldValue('schoolId') &&
      this.props.form.getFieldValue('schoolId') === undefined
    ) {
      this.setState({ ...this.state, schools: [] });
    }
  }

  public render() {
    return this.props.allowUnknownSchools ? (
      <Form.Item className="form__item" label={this.props.label} colon={false}>
        {this.props.form.getFieldDecorator('schoolName', {
          rules: [{ required: true, message: 'Please enter your school' }],
          initialValue: this.props.initialValue,
        })(
          // @ts-ignore
          <AutoComplete
            dataSource={this.state.schools.map((s) => s.name)}
            placeholder={this.props.placeholder}
            size={'large'}
            onSearch={this.onSearchSchool}
            onChange={this.onUpdateSchool}
            data-qa="school"
            dropdownClassName={'dropdown'}
            {...this.props}
          />,
        )}
      </Form.Item>
    ) : (
      <Form.Item className="form__item" label={this.props.label}>
        {this.props.form.getFieldDecorator('schoolId', {
          rules: [{ required: true, message: 'Please enter your school' }],
          initialValue: this.props.initialValue && this.props.initialValue.name,
        })(
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
            {...this.props}
          >
            {this.generateOptions()}
          </Select>,
        )}
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

    return schools.map((school) => (
      <Option
        key={school.id}
        value={school.id}
        dataQa="school-option"
        dataState={school.name}
        title={school.name}
      >
        {school.name}
      </Option>
    ));
  };
}
