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
  cancelForm: () => void;
}

export class ProfileFormFields extends React.Component<
  Props & FormComponentProps
> {
  public render() {
    console.log(this.props.firstName);
    return (
      <Form data-qa="profile-form" className="account-settings__form">
        <Row>
          <NameForm
            form={this.props.form}
            initialFirstName={this.props.firstName}
            initialLastName={this.props.lastName}
          />
        </Row>
        <section className="buttons">
          <Button
            data-qa={'cancel-edit-button'}
            type={'ghost'}
            onClick={this.props.cancelForm}
            size="large"
          >
            Cancel
          </Button>
          <Button htmlType={'submit'} type={'primary'} size="large">
            Save changes
          </Button>
        </section>
      </Form>
    );
  }
}

export const ProfileForm = Form.create<Props & FormComponentProps>()(
  ProfileFormFields,
);