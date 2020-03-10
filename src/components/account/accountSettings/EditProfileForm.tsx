import { Button, Form, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { editUser } from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import { Links } from '../../../types/Links';
import { Subject } from '../../../types/Subject';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from '../../common/a11y/ScreenReaderErrors';
import NotificationFactory from '../../common/NotificationFactory';
import { AgeRangeForm } from '../form/AgeRangeForm';
import { transformErrors } from '../form/FormHelper';
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

interface InternalState {
  screenReaderErrors: ScreenReaderError[];
}

class ProfileForm extends React.Component<
  Props & DispatchProps,
  InternalState
> {
  public constructor(props: Props & DispatchProps) {
    super(props);

    this.state = {
      screenReaderErrors: null,
    };
  }

  public render() {
    return (
      <Form
        onFinish={this.handleFormFinish}
        onFinishFailed={this.handleFormFinishFailed}
        data-qa="profile-form"
        className="account-settings__form"
        initialValues={{
          firstName: this.props.userProfile.firstName,
          lastName: this.props.userProfile.lastName,
          subjects: this.props.userProfile.subjects,
          ageRange: this.props.userProfile.ages,
        }}
      >
        {this.state.screenReaderErrors && (
          <ScreenReaderErrors errors={this.state.screenReaderErrors} />
        )}
        <Row>
          <NameForm />
        </Row>
        <Row>
          <SubjectsForm
            subjects={this.props.subjects}
            placeholder={'Choose subjects'}
            label={'Subjects'}
          />
        </Row>
        <Row>
          <AgeRangeForm label={'Age groups'} />
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
            size="large"
          >
            Save changes
          </Button>
        </section>
      </Form>
    );
  }

  private handleFormFinishFailed = errors => {
    this.setState({
      screenReaderErrors: transformErrors(errors),
    });
  };

  private handleFormFinish = values => {
    const ageRanges = (values.ageRange as string[]).map(it =>
      AgeRange.decodeJSON(it),
    );
    const ages = AgeRange.extractContainedAges(ageRanges);
    editUser(this.props.links, {
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
)(ProfileForm);
