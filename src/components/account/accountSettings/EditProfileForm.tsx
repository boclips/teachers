import { Button, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import updateUser from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import { Links } from '../../../types/Links';
import { Subject } from '../../../types/Subject';
import NotificationFactory from '../../common/NotificationFactory';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { NameForm } from '../form/NameForm';
import { SubjectsForm } from '../form/SubjectsForm';
import { updateUserAction } from './redux/actions/updateUserAction';

interface Props {
  userProfile: UserProfile;
  subjects: Subject[];
  toggleForm: () => void;
  links: Links;
}

interface DispatchProps {
  updateUser: () => {};
}

class ProfileFormFields extends React.Component<
  Props & FormComponentProps & DispatchProps
> {
  public render() {
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
            initialValue={this.props.userProfile.ages}
          />
        </Row>
        <section className="buttons">
          <Button
            data-qa={'cancel-edit-button'}
            type={'ghost'}
            onClick={this.props.toggleForm}
            size="large"
          >
            Cancel
          </Button>
          <Button
            htmlType={'submit'}
            type={'primary'}
            data-qa={'submit-update-user'}
            onClick={this.submit}
            size="large"
          >
            Save changes
          </Button>
        </section>
      </Form>
    );
  }

  private submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const ageRanges = (values.ageRange as string[]).map(it =>
          AgeRange.decodeJSON(it),
        );
        const ages = AgeRange.extractContainedAges(ageRanges);
        updateUser(this.props.links, {
          ...this.props.userProfile,
          firstName: values.firstName,
          lastName: values.lastName,
          ages,
          subjects: values.subjects,
        })
          .then(() => {
            this.props.updateUser();
            this.props.toggleForm();
          })
          .catch(ex => {
            console.error(ex);
            NotificationFactory.error({
              message: 'Ooops! Something went wrong...',
              description: 'Please try again or contact our support team.',
            });

            this.setState({
              ...this.state,
              updating: false,
            });
          });
      }
    });
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    updateUser: () => dispatch(updateUserAction()),
  };
}

export const EditProfileForm = connect<Props, DispatchProps>(
  null,
  mapDispatchToProps,
)(Form.create<DispatchProps & Props & FormComponentProps>()(ProfileFormFields));
