import { Button, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import updateUser from '../../../services/users/updateUser';
import { UserProfile } from '../../../services/users/UserProfile';
import { Country } from '../../../types/Country';
import { Links } from '../../../types/Links';
import { UsaState } from '../../../types/UsaState';
import NotificationFactory from '../../common/NotificationFactory';
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
}

export class EditSchoolSettingsFields extends React.Component<
  Props & FormComponentProps & DispatchProps,
  InternalState
> {
  constructor(props: Props & FormComponentProps & DispatchProps) {
    super(props);
    this.state = {
      latestState: this.props.userProfile.state.id,
    };
  }

  public render() {
    return (
      <Form data-qa="school-settings-form" className="account-settings__form">
        <Row>
          <StatesForm
            form={this.props.form}
            states={this.props.country.states}
            initialValue={this.props.userProfile.state.id}
            label={'State'}
            onStateChange={this.stateChange}
          />
        </Row>
        <Row>
          <SchoolForm
            form={this.props.form}
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
            onClick={this.submit}
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
      this.props.form.setFieldsValue({ schoolId: undefined });
    }

    this.setState({ latestState: value.id });
  };

  private submit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        updateUser(this.props.links, {
          ...this.props.userProfile,
          state: { name: undefined, id: values.state },
          school: {
            name: values.schoolName,
            id: values.schoolId === UNKNOWN_SCHOOL ? null : values.schoolId,
          },
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
      }
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
)(Form.create<Props & FormComponentProps>()(EditSchoolSettingsFields));
