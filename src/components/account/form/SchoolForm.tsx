import { AutoComplete, Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { searchSchools } from '../../../services/schools/searchSchools';
import { Country } from '../../../types/Country';
import { School } from '../../../types/School';

interface SchoolFormProps {
  country: Country;
  placeholder: string;
  label?: string;
  initialValue?: string;
}

interface SchoolFormState {
  schools: School[];
}

export class SchoolForm extends React.Component<
  FormComponentProps & SchoolFormProps,
  SchoolFormState
> {
  constructor(props: Readonly<FormComponentProps & SchoolFormProps>) {
    super(props);
    this.state = {
      schools: [],
    };
  }

  public onUpdateSchool = (value: string) => {
    this.props.form.setFieldsValue({ school: value });
  };

  public onSearchSchool = value => {
    if (value) {
      searchSchools(value, this.props.country).then(schools => {
        this.setState({
          ...this.state,
          schools,
        });
      });
    }
  };

  public render() {
    return (
      <Form.Item className="form__item" label={this.props.label}>
        {this.props.form.getFieldDecorator('school', {
          rules: [{ required: true, message: 'Please enter your school' }],
          initialValue: this.props.initialValue,
        })(
          // @ts-ignore
          <AutoComplete
            dataSource={this.state.schools.map(s => s.name)}
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
    );
  }
}
