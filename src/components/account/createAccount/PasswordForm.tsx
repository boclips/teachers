import { Form, Input } from 'antd';
import Eye from '@ant-design/icons';
import EyeInvisible from '@ant-design/icons';
import React from 'react';
import ErrorSvg from '../../../../resources/images/validation-error.svg';
import SuccessSvg from '../../../../resources/images/validation-success.svg';
import './PasswordForm.less';

interface State {
  show: boolean;
}

interface Constraint {
  regex: RegExp;
  label: React.ReactNode;
}

export class PasswordForm extends React.Component<{}, State> {
  public constructor(props, context: any) {
    super(props, context);
    this.state = { show: false };
  }

  private constraints: Constraint[] = [
    {
      regex: /^(.){8,}$/,
      label: '8 characters',
    },
    {
      regex: /(?=.*[A-Z])/,
      label: '1 uppercase',
    },
    {
      regex: /(?=.*[\d])/,
      label: '1 number',
    },
    {
      regex: /(?=.*[a-z])/,
      label: '1 lowercase',
    },
  ];

  private toggleShow = () =>
    this.setState({ ...this.state, show: !this.state.show });

  public render() {
    return (
      <Form.Item
        name="password"
        label="Password"
        required={false}
        className="password-form__container"
        rules={[
          {
            validator: this.validatePassword,
          },
        ]}
      >
        <Input
          data-qa="password"
          size="large"
          type={this.state.show ? 'text' : 'password'}
          placeholder="Enter your password"
          suffix={
            this.state.show ? (
              <a
                href="#"
                className="password-form__show"
                data-qa="hide-password"
                onClick={this.toggleShow}
              >
                <EyeInvisible />
                &nbsp;Hide
              </a>
            ) : (
              <a
                href="#"
                className="password-form__show"
                data-qa="show-password"
                onClick={this.toggleShow}
              >
                <Eye />
                &nbsp;Show
              </a>
            )
          }
        />
      </Form.Item>
    );
  }
  private validatePassword = (_, value, callback) => {
    if (this.constraints.find(c => !value.match(c.regex))) {
      callback(
        <section className="password-form__rules-container">
          Your password must have at least:
          <section data-qa="password-rules" className="password-form__rules">
            {this.constraints.map((c, i) => (
              <Criteria key={`criteria-${i}`} regex={c.regex} value={value}>
                {c.label}
              </Criteria>
            ))}
          </section>
        </section>,
      );
    } else {
      callback();
    }
  };
}

interface CriteriaProps {
  regex: RegExp;
  value: string;
  children: React.ReactNode;
}

function Criteria(props: CriteriaProps) {
  const valid = props.value.match(props.regex);
  return (
    <section
      data-qa="password-rule"
      className={
        'password-form__rule ' +
        (valid ? 'password-form__rule__valid' : 'password-form__rule__error')
      }
    >
      <section data-qa={valid ? 'password-success' : 'password-error'}>
        {valid ? (
          <SuccessSvg aria-hidden={true} />
        ) : (
          <ErrorSvg aria-hidden={true} />
        )}
        {props.children}
      </section>
    </section>
  );
}
