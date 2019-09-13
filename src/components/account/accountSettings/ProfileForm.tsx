import { Button, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { AgeRange } from '../../../types/AgeRange';
import { Subject } from '../../../types/Subject';
import { NameForm } from '../form/NameForm';

interface Props {
  firstName: string;
  lastName: string;
  subjects: Subject[];
  ages: AgeRange[];
}

export class ProfileFormFields extends React.Component<
  Props & FormComponentProps
> {
  public render() {
    console.log(this.props.firstName);
    return (
      <Form data-qa="profile-form">
        <h1 className={'account-settings__title'}>Edit Profile</h1>
        <Row>
          <NameForm
            form={this.props.form}
            initialFirstName={this.props.firstName}
            initialLastName={this.props.lastName}
          />
        </Row>
        <Row>
          <Button htmlType={'submit'} type={'ghost'}>
            Cancel
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            Save changes
          </Button>
        </Row>
      </Form>
    );
  }
}

export const ProfileForm = Form.create<Props & FormComponentProps>()(
  ProfileFormFields,
);
