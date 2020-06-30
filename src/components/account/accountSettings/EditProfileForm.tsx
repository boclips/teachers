import { Form } from '@ant-design/compatible';
import { Button } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { extractContainedAges } from 'src/components/ageRanges/extractContainedAges';
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

class ProfileFormFields extends React.Component<
  Props & FormComponentProps & DispatchProps,
  InternalState
> {
  public constructor(props: Props & FormComponentProps & DispatchProps) {
    super(props);

    this.state = {
      screenReaderErrors: null,
    };
  }

  public render() {
    return (
      <Form data-qa="profile-form" className="account-settings__form">
        {this.state.screenReaderErrors && (
          <ScreenReaderErrors errors={this.state.screenReaderErrors} />
        )}
        <NameForm
          form={this.props.form}
          initialFirstName={this.props.userProfile.firstName}
          initialLastName={this.props.userProfile.lastName}
        />

        <SubjectsForm
          form={this.props.form}
          subjects={this.props.subjects}
          placeholder={'Choose subjects'}
          initialValue={this.props.userProfile.subjects}
          label={'Subjects'}
        />

        <AgeRangeForm
          form={this.props.form}
          initialValue={this.props.userProfile.ages}
          label={'Age groups'}
        />
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
        const ageRanges = (values.ageRange as string[]).map((it) =>
          AgeRange.fromJson(it),
        );
        const ages = extractContainedAges(ageRanges);
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
          .catch((ex) => {
            console.error(ex);
            NotificationFactory.error({
              message: 'Ooops! Something went wrong...',
              description: 'Please try again or contact our support team.',
            });

            this.setState({
              ...this.state,
            });
          });
      } else {
        this.setState({
          ...this.state,
          screenReaderErrors: transformErrors(err),
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
