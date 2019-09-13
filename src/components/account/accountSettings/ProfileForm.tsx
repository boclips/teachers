import { Button, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import { Subject } from '../../../types/Subject';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { NameForm } from '../form/NameForm';
import { SubjectsForm } from '../form/SubjectsForm';

interface Props {
  userProfile: UserProfile;
  subjects: Subject[];
  ages: AgeRange[];
  cancelForm: () => void;
}

export class ProfileFormFields extends React.Component<
  Props & FormComponentProps
> {
  public render() {
    console.log(this.props.userProfile.firstName);
    return (
      <Form data-qa="profile-form" className="account-settings__form">
        <Row>
          <NameForm
            form={this.props.form}
            initialFirstName={this.props.userProfile.firstName}
            initialLastName={this.props.userProfile.lastName}
          />
        </Row>
        <Row>
          <SubjectsForm
            form={this.props.form}
            subjects={this.props.subjects}
            placeholder={'Subjects'}
            initialValue={this.props.userProfile.subjects}
          />
        </Row>
        <Row>
          <AgeRangeForm
            form={this.props.form}
            ageRanges={this.props.ages}
            initialValue={this.props.userProfile.ages}
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
