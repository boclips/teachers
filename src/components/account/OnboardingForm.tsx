import { Button, Col, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { push } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import OnboardingLogoSVG from '../../../resources/images/dwarf-with-pencil.svg';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { RegistrationContext } from '../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../services/session/RegistrationContextService';
import updateUser from '../../services/users/updateUser';
import { UserProfile } from '../../services/users/UserProfile';
import { AgeRange } from '../../types/AgeRange';
import { Links } from '../../types/Links';
import State from '../../types/State';
import { Subject } from '../../types/Subject';
import NotificationFactory from '../common/NotificationFactory';
import { fetchSubjectsAction } from '../multipleSelect/redux/actions/fetchSubjectsAction';
import { AgeRangeForm } from './form/AgeRangeForm';
import { ErrorAnnouncement } from './form/ErrorAnnouncement';
import { MarketingAgreementForm } from './form/MarketingAgreementForm';
import { NameForm } from './form/NameForm';
import { PrivacyPolicyAgreementForm } from './form/PrivacyPolicyAgreementForm';
import { SubjectsForm } from './form/SubjectsForm';
import './OnboardingForm.less';

interface OnboardingProps {
  links: Links;
  subjects: Subject[];
  ageRanges: AgeRange[];
  userProfile: UserProfile;
}

interface InternalState {
  updating: boolean;
  formErrors: object;
}

interface DispatchProps {
  fetchSubjects: () => void;
  goToHomepage: () => void;
}

class OnboardingForm extends React.Component<
  OnboardingProps & FormComponentProps & DispatchProps,
  InternalState
> {
  public state = {
    updating: false,
    formErrors: null,
  };

  public componentDidMount() {
    AnalyticsFactory.getInstance().trackAccountRegistration();

    this.props.fetchSubjects();
  }

  public render() {
    return this.renderForm();
  }

  public renderForm() {
    return (
      <section className="onboarding-form__container">
        <Row>
          <Col xs={{ span: 0 }} lg={{ span: 12 }}>
            <OnboardingLogoSVG className="onboarding__logo" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <section className="visually-hidden">
              <ErrorAnnouncement error={this.state.formErrors} />
            </section>

            <Form
              onSubmit={this.handleSubmit}
              layout="vertical"
              data-qa="onboarding-form"
              className="onboarding-form__form"
            >
              <h1 className="alt onboarding-form__title big-title">
                Welcome to <strong>Boclips for teachers</strong>
              </h1>

              <p>
                Tell us a bit about yourself, so that we can find you the
                perfect video to use in class.
              </p>

              <p>
                You will be able to edit this information in your account
                settings.
              </p>

              <section className="onboarding-form__form-body">
                <NameForm form={this.props.form} label="What is your name?" />
                <SubjectsForm
                  label="What subjects do you teach?"
                  form={this.props.form}
                  subjects={this.props.subjects}
                  placeholder="Choose subjects"
                  initialValue={[]}
                />
                <AgeRangeForm
                  label="What ages do you teach"
                  form={this.props.form}
                  ageRanges={this.props.ageRanges}
                />

                <PrivacyPolicyAgreementForm form={this.props.form} />
                <MarketingAgreementForm form={this.props.form} />
              </section>

              <Button
                data-qa="onboard-button"
                className="onboarding-form__submit"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={this.state.updating}
                loading={this.state.updating}
              >
                Finish
              </Button>
            </Form>
          </Col>
        </Row>
      </section>
    );
  }

  private handleSubmit = e => {
    e.preventDefault();
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const registrationContext: RegistrationContext = RegistrationContextService.retrieve();

        this.setState({ ...this.state, updating: true });
        updateUser(this.props.links, {
          ...this.props.userProfile,
          firstName: values.firstName,
          lastName: values.lastName,
          ages: values.ageRange,
          subjects: values.subjects,
          hasOptedIntoMarketing: values.hasOptedIntoMarketing,
          referralCode: registrationContext && registrationContext.referralCode,
          utm: registrationContext && registrationContext.utm,
        })
          .then(() => {
            this.props.goToHomepage();
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
      } else {
        this.setState({
          ...this.state,
          formErrors: err,
        });
      }
    });
  };
}

function mapStateToProps(state: State): OnboardingProps {
  return {
    links: state.links,
    subjects: state.subjects,
    ageRanges: state.ageRanges,
    userProfile: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchSubjects: () => dispatch(fetchSubjectsAction()),
    goToHomepage: () => dispatch(push('/')),
  };
}

export default connect<OnboardingProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<OnboardingProps & FormComponentProps>()(OnboardingForm));
