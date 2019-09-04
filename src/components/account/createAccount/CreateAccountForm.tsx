import { Button, Col, Form, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import GoogleSVG from '../../../../resources/images/google.svg';
import MicrosoftSVG from '../../../../resources/images/office-365.svg';
import { requestSsoAuthentication } from '../../../app/redux/authentication/actions/requestSsoAuthentication';
import {
  createAccount,
  CreateAccountRequest,
} from '../../../services/account/createAccount';
import Utm from '../../../services/account/Utm';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { RegistrationContext } from '../../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../../services/session/RegistrationContextService';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import { extractQueryParam } from '../referral/extractQueryParam';
import { CaptchaNotice } from './CaptchaNotice';
import { CreateAccountConfirmation } from './CreateAccountConfirmation';
import './CreateAccountForm.less';
import { handleError, handleUserExists } from './createAccountHelpers';
import { EmailForm } from './EmailForm';
import { LoginLink } from './LoginLink';
import { PasswordForm } from './PasswordForm';
import { Recaptcha } from './recaptcha/Recaptcha';

interface CreateAccountProps {
  links: Links;
  referralCode: string;
  utm: Utm;
}

interface InternalState {
  showConfirmation: boolean;
  confirmDirty: boolean;
  creating: boolean;
  renderRecaptcha: boolean;
}

interface DispatchProps {
  onSsoLogin: (idpHint: string) => void;
}

class CreateAccountForm extends React.Component<
  CreateAccountProps & FormComponentProps & DispatchProps,
  InternalState
> {
  public state = {
    showConfirmation: false,
    confirmDirty: false,
    creating: false,
    renderRecaptcha: true,
  };

  public componentDidMount() {
    AnalyticsFactory.getInstance().trackAccountRegistration();

    const registrationContext: RegistrationContext = {
      referralCode: this.props.referralCode,
      utm: this.props.utm,
    };

    RegistrationContextService.store(registrationContext);
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
        <Form onSubmit={this.handleSubmit}>
          <h1 className="alt create-account-form__title">Create account</h1>

          <section className="create-account-form__form">
            <EmailForm form={this.props.form} />

            <PasswordForm form={this.props.form} />
          </section>

          <div style={{ display: 'none' }}>
            <Form.Item>
              {getFieldDecorator('analyticsId', {
                rules: [],
                initialValue: AnalyticsFactory.getInstance().getId(),
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
            className="create-account-form__button create-account-form__submit"
            size="large"
            type="primary"
            htmlType="submit"
            disabled={this.state.creating}
            loading={this.state.creating}
          >
            Create account
          </Button>
        </Form>
        <LoginLink />

        <section className="create-account-form__divider-container">
          <label className="create-account-form__divider-label">or</label>
          <hr className="create-account-form__divider" />
        </section>

        <section className="create-account-form__social-buttons-container">
          <Row gutter={16}>
            <ul className="create-account-form__social-buttons-list">
              <Col sm={24} md={12}>
                <li className="create-account-form__social-buttons-list-item">
                  <Button
                    data-qa="google-button"
                    className="create-account-form__button create-account-form__social-button"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.creating}
                    loading={this.state.creating}
                    onClick={this.handleGoogleSsoLogin}
                  >
                    <span className="create-account-form__social-button-icon">
                      <GoogleSVG aria-hidden={true} />
                    </span>
                    <span>Continue with Google</span>
                  </Button>
                </li>
              </Col>
              <Col sm={24} md={12}>
                <li className="create-account-form__social-buttons-list-item">
                  <Button
                    data-qa="microsoft-button"
                    className="create-account-form__button create-account-form__social-button"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={this.state.creating}
                    loading={this.state.creating}
                    onClick={this.handleMicrosoftSsoLogin}
                  >
                    <span className="create-account-form__social-button-icon">
                      <MicrosoftSVG aria-hidden={true} />
                    </span>
                    <span>Continue with Office 365</span>
                  </Button>
                </li>
              </Col>
            </ul>
          </Row>
        </section>

        <section className="create-account-form__recaptcha">
          <CaptchaNotice />
        </section>
      </section>
    );
  }

  private updateRecaptchaToken = recaptchaToken => {
    this.props.form.setFieldsValue({ recaptchaToken });
    this.setState({ renderRecaptcha: false });
  };

  private handleGoogleSsoLogin = () => {
    this.props.onSsoLogin('google');
  };

  private handleMicrosoftSsoLogin = () => {
    this.props.onSsoLogin('microsoft');
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

              if (error && error.response.status === 409) {
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
        }
      },
    );
  };
}

function mapStateToProps(state: State): CreateAccountProps {
  const queryParam = state.router.location.search;

  const utm = extraxtUtmParams(queryParam);

  return {
    links: state.links,
    referralCode: extractQueryParam(queryParam, 'REFERRALCODE'),
    utm,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onSsoLogin: (idpHint: string) =>
      dispatch(requestSsoAuthentication(idpHint)),
  };
}

const extraxtUtmParams = queryParam => {
  const source = extractQueryParam(queryParam, 'utm_source');
  const term = extractQueryParam(queryParam, 'utm_term');
  const medium = extractQueryParam(queryParam, 'utm_medium');
  const campaign = extractQueryParam(queryParam, 'utm_campaign');
  const content = extractQueryParam(queryParam, 'utm_content');

  if (source || term || medium || campaign || content) {
    return {
      ...(source && { source }),
      ...(term && { term }),
      ...(medium && { medium }),
      ...(campaign && { campaign }),
      ...(content && { content }),
    };
  } else {
    return undefined;
  }
};

export default connect<CreateAccountProps, {}, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create<CreateAccountProps & FormComponentProps>()(CreateAccountForm));