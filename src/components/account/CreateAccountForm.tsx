import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { connect } from 'react-redux';
import {
  createAccount,
  CreateAccountRequest,
} from '../../services/account/createAccount';
import Utm from '../../services/account/Utm';
import AnalyticsFactory from '../../services/analytics/AnalyticsFactory';
import { RegistrationContext } from '../../services/session/RegistrationContext';
import { RegistrationContextService } from '../../services/session/RegistrationContextService';
import { Links } from '../../types/Links';
import State from '../../types/State';
import { CreateAccountConfirmation } from './CreateAccountConfirmation';
import './CreateAccountForm.less';
import { handleError, handleUserExists } from './createAccountHelpers';
import { CaptchaNotice } from './form/CaptchaNotice';
import { EmailForm } from './form/EmailForm';
import { ErrorAnnouncement } from './form/ErrorAnnouncement';
import { LoginLink } from './form/LoginLink';
import { PasswordForm } from './form/PasswordForm';
import { Recaptcha } from './recaptcha/Recaptcha';
import { extractQueryParam } from './referral/extractQueryParam';

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
  formErrors: object;
}

class CreateAccountForm extends React.Component<
  CreateAccountProps & FormComponentProps,
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

    const registrationContextService = new RegistrationContextService();
    const registrationContext: RegistrationContext = {
      referralCode: this.props.referralCode,
      utm: this.props.utm,
    };

    registrationContextService.store(registrationContext);
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
        <section className="visually-hidden">
          <ErrorAnnouncement error={this.state.formErrors} />
        </section>

        <Form onSubmit={this.handleSubmit}>
          <h1 className="alt create-account-form__title">Create account</h1>

          <section className="create-account-form__form">
            <EmailForm form={this.props.form} />

            <PasswordForm form={this.props.form} />
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
            disabled={this.state.creating}
            loading={this.state.creating}
          >
            Create account
          </Button>
        </Form>
        <LoginLink />

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
        } else {
          this.setState({
            ...this.state,
            formErrors: err,
          });
        }
      },
    );
  };
}

function mapStateToProps(state: State): CreateAccountProps {
  const queryParam = state.router.location.search;

  return {
    links: state.links,
    referralCode: extractQueryParam(queryParam, 'REFERRALCODE'),
    utm: {
      source: extractQueryParam(queryParam, 'utm_source'),
      term: extractQueryParam(queryParam, 'utm_term'),
      medium: extractQueryParam(queryParam, 'utm_medium'),
      campaign: extractQueryParam(queryParam, 'utm_campaign'),
      content: extractQueryParam(queryParam, 'utm_content'),
    },
  };
}

export default connect<CreateAccountProps, {}, {}>(mapStateToProps)(
  Form.create<CreateAccountProps & FormComponentProps>()(CreateAccountForm),
);
