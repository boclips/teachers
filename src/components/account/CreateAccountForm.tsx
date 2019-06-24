import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RegistrationLogo from '../../../resources/images/registration-logo.svg';
import {
  createAccount,
  CreateAccountRequest,
} from '../../services/account/createAccount';
import Utm from '../../services/account/Utm';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { AgeRange } from '../../types/AgeRange';
import { Links } from '../../types/Links';
import State from '../../types/State';
import { Subject } from '../../types/Subject';
import { fetchSubjectsAction } from '../multipleSelect/redux/actions/fetchSubjectsAction';
import { CreateAccountConfirmation } from './CreateAccountConfirmation';
import './CreateAccountForm.less';
import { handleError, handleUserExists } from './createAccountHelpers';
import { AgeRangeForm } from './form/AgeRangeForm';
import { CaptchaNotice } from './form/CaptchaNotice';
import { EmailForm } from './form/EmailForm';
import { ErrorAnnouncement } from './form/ErrorAnnouncement';
import { LoginLink } from './form/LoginLink';
import { MarketingAgreementForm } from './form/MarketingAgreementForm';
import { NameForm } from './form/NameForm';
import { PrivacyPolicyAgreementForm } from './form/PrivacyPolicyAgreementForm';
import { SubjectsForm } from './form/SubjectsForm';
import TwoColumnInlineForm from './form/TwoColumnInlineFormItem';
import { Recaptcha } from './recaptcha/Recaptcha';
import { extractQueryParam } from './referral/extractQueryParam';

interface CreateAccountProps {
  links: Links;
  referralCode: string;
  subjects: Subject[];
  ageRanges: AgeRange[];
  utm: Utm;
}

interface InternalState {
  showConfirmation: boolean;
  confirmDirty: boolean;
  creating: boolean;
  renderRecaptcha: boolean;
  formErrors: object;
}

interface DispatchProps {
  fetchSubjects: () => void;
}

class RegistrationForm extends React.Component<
  CreateAccountProps & FormComponentProps & DispatchProps,
  InternalState
> {
  public state = {
    showConfirmation: false,
    confirmDirty: false,
    creating: false,
    renderRecaptcha: true,
    formErrors: null,
  };

  public componentDidMount() {
    AnalyticsFactory.getInstance().trackAccountRegistration();

    this.props.fetchSubjects();
  }

  public render() {
    return this.state.showConfirmation ? (
      <CreateAccountConfirmation />
    ) : (
      this.renderForm()
    );
  }

  public renderForm() {
    const { getFieldDecorator } = this.props.form;

    return (
      <section className="create-account-form__container">
        <Row>
          <Col xs={{ span: 0 }} lg={{ span: 12 }}>
            <RegistrationLogo className="create-account__logo" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <section className="visually-hidden">
              <ErrorAnnouncement error={this.state.formErrors} />
            </section>

            <Form onSubmit={this.handleSubmit}>
              <h1 className="alt create-account-form__title">Create account</h1>

              <section className="create-account-form__form">
                <NameForm form={this.props.form} />
                <SubjectsForm
                  form={this.props.form}
                  subjects={this.props.subjects}
                  placeholder="Subjects I teach.."
                  initialValue={[]}
                />
                <AgeRangeForm
                  form={this.props.form}
                  ageRanges={this.props.ageRanges}
                />
                <EmailForm form={this.props.form} />

                <TwoColumnInlineForm
                  leftColumn={getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        min: 8,
                        message:
                          'Please enter at least 8 characters for your password',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(
                    <Input
                      data-qa="password"
                      size="large"
                      type="password"
                      placeholder="Password"
                    />,
                  )}
                  rightColumn={getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(
                    <Input
                      data-qa="password-confirm"
                      size="large"
                      type="password"
                      onBlur={this.handleConfirmBlur}
                      placeholder="Confirm password"
                    />,
                  )}
                />

                <PrivacyPolicyAgreementForm form={this.props.form} />
                <MarketingAgreementForm form={this.props.form} />
                <CaptchaNotice />
              </section>

              <div style={{ display: 'none' }}>
                <Form.Item>
                  {getFieldDecorator('referralCode', {
                    rules: [],
                    initialValue: this.props.referralCode,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('analyticsId', {
                    rules: [],
                    initialValue: AnalyticsFactory.getInstance().getId(),
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('utmSource', {
                    rules: [],
                    initialValue: this.props.utm.source,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('utmTerm', {
                    rules: [],
                    initialValue: this.props.utm.term,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('utmContent', {
                    rules: [],
                    initialValue: this.props.utm.content,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('utmMedium', {
                    rules: [],
                    initialValue: this.props.utm.medium,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('utmCampaign', {
                    rules: [],
                    initialValue: this.props.utm.campaign,
                  })(<Input type="text" />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('recaptchaToken', {
                    rules: [],
                    initialValue: '',
                  })(<Input type="text" />)}
                </Form.Item>
                {this.state.renderRecaptcha && (
                  <Recaptcha verifyCallback={this.updateRecaptchaToken} />
                )}
              </div>

              <Button
                data-qa="register-button"
                className="create-account-form__submit"
                size="large"
                type="primary"
                htmlType="submit"
                disabled={
                  this.state.creating ||
                  !this.props.form.getFieldValue('privacy_policy')
                }
                loading={this.state.creating}
              >
                Register
              </Button>
            </Form>
            <LoginLink />
          </Col>
        </Row>
      </section>
    );
  }

  private updateRecaptchaToken = recaptchaToken => {
    this.props.form.setFieldsValue({ recaptchaToken });
    this.setState({ renderRecaptcha: false });
  };

  private handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.form.validateFieldsAndScroll(
      (err, values: CreateAccountRequest) => {
        if (!err) {
          this.setState({ ...this.state, creating: true });
          createAccount(this.props.links, values)
            .then(() => {
              this.setState({ ...this.state, showConfirmation: true });
            })
            .catch(error => {
              const formDetailsRedacted = {
                ...values,
                password: 'redacted',
              };

              if (error.response.status === 409) {
                handleUserExists(formDetailsRedacted);
              } else {
                handleError(formDetailsRedacted);
              }

              this.setState({
                ...this.state,
                creating: false,
                renderRecaptcha: true,
              });
            });
        } else {
          this.setState({
            ...this.state,
            formErrors: err,
          });
        }
      },
    );
  };

  private handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      confirmDirty: this.state.confirmDirty || !!value,
    });
  };

  private compareToFirstPassword = (_, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The passwords are not the same');
    } else {
      callback();
    }
  };

  private validateToNextPassword = (_, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };
}

function mapStateToProps(state: State): CreateAccountProps {
  const queryParam = state.router.location.search;

  return {
    links: state.links,
    referralCode: extractQueryParam(queryParam, 'REFERRALCODE'),
    subjects: state.subjects,
    ageRanges: state.ageRanges,
    utm: {
      source: extractQueryParam(queryParam, 'utm_source'),
      term: extractQueryParam(queryParam, 'utm_term'),
      medium: extractQueryParam(queryParam, 'utm_medium'),
      campaign: extractQueryParam(queryParam, 'utm_campaign'),
      content: extractQueryParam(queryParam, 'utm_content'),
    },
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchSubjects: () => dispatch(fetchSubjectsAction()),
  };
}

export default connect<CreateAccountProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<CreateAccountProps & FormComponentProps>()(RegistrationForm));
