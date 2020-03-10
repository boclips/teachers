import { Button, Form, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {FormInstance} from 'antd/lib/form';
import { editUser } from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { Country } from '../../../types/Country';
import { Links } from '../../../types/Links';
import { UsaState } from '../../../types/UsaState';
import {
  ScreenReaderError,
  ScreenReaderErrors,
} from '../../common/a11y/ScreenReaderErrors';
import NotificationFactory from '../../common/NotificationFactory';
import { transformErrors } from '../form/FormHelper';
import { SchoolForm, UNKNOWN_SCHOOL } from '../form/SchoolForm';
import { StatesForm } from '../form/StatesForm';
import { updateUserAction } from './redux/actions/updateUserAction';

interface Props {
  country: Country;
  toggleForm: () => void;
  links: Links;
  userProfile: UserProfile;
}

interface DispatchProps {
  updateUser: () => void;
}

interface InternalState {
  latestState: string;
  screenReaderErrors: ScreenReaderError[];
}

export class EditSchoolSettingsFields extends React.Component<
  Props & DispatchProps,
  InternalState
> {

  private formRef = React.createRef<FormInstance>();

  public constructor(props: Props & DispatchProps) {
    super(props);
    this.state = {
      latestState: this.props.userProfile.state.id,
      screenReaderErrors: null,
    };
  }

  public render() {
    return (
      <Form
        ref={this.formRef}
        onFinish={this.handleFormFinish}
        onFinishFailed={this.handleFormFinishFailed}
        data-qa="school-settings-form"
        className="account-settings__form"
      >
        {this.state.screenReaderErrors && (
          <ScreenReaderErrors errors={this.state.screenReaderErrors} />
        )}
        <Row>
          <StatesForm
            formRef={this.formRef}
            states={this.props.country.states}
            initialValue={this.props.userProfile.state.id}
            label={'State'}
            onStateChange={this.stateChange}
          />
        </Row>
        <Row>
          <SchoolForm
            formRef={this.formRef}
            country={this.props.country}
            state={this.props.userProfile.state}
            label={'School'}
            allowUnknownSchools={false}
            initialValue={this.props.userProfile.school}
            placeholder={'Enter the name of your school'}
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
            data-qa={'save-button'}
            size="large"
          >
            Save changes
          </Button>
        </section>
      </Form>
    );
  }

  private stateChange = (value: UsaState) => {
    if (this.state.latestState !== value.id) {
      this.formRef.current.setFieldsValue({ schoolId: undefined });
    }

    this.setState({ latestState: value.id });
  };

  private handleFormFinishFailed = errors => {
    this.setState({
      screenReaderErrors: transformErrors(errors),
    });
  };

  private handleFormFinish = values => {
    editUser(this.props.links, {
      state: values.state,
      schoolName: values.schoolName,
      schoolId: values.schoolId === UNKNOWN_SCHOOL ? null : values.schoolId,
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

export const EditSchoolSettingsForm = connect<Props, DispatchProps>(
  null,
  mapDispatchToProps,
)(EditSchoolSettingsFields);
