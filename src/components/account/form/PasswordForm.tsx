import { Col, Form, Icon, Input, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

interface State {
  password: string;
}

interface Constraint {
  regex: RegExp;
  label: React.ReactNode;
}

export class PasswordForm extends React.Component<FormComponentProps, State> {
  constructor(props: FormComponentProps, context: any) {
    super(props, context);
    this.state = { password: '' };
  }

  private constraints: Constraint[] = [
    {
      regex: /^(.){6,}$/,
      label: '6 characters',
    },
    {
      regex: /(?=.*[A-Z])/,
      label: '1 upercase',
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

  public render() {
    return (
      <Row>
        <Col xs={{ span: 24 }} md={{ span: 16 }} xl={{ span: 16 }}>
          <Form.Item label="Password" required={false}>
            {this.props.form.getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  min: 8,
                  message:
                    'Please enter at least 8 characters for your password',
                },
                {
                  validator: this.validatePassword,
                },
              ],
            })(
              <Input
                data-qa="password"
                size="large"
                type="password"
                placeholder="Enter your password"
                onChange={this.onPasswordChange}
                suffix={
                  <a href="#">
                    <Icon type="eye" /> Show
                  </a>
                }
              />,
            )}
          </Form.Item>
          <section>
            Your password must have at least:
            {this.constraints.map((c, i) => (
              <Criteria
                key={`criteria-${i}`}
                regex={c.regex}
                value={this.state.password}
              >
                {c.label}
              </Criteria>
            ))}
          </section>
        </Col>
      </Row>
    );
  }
  private onPasswordChange = e =>
    this.setState({ ...this.state, password: e.target.value });

  private validatePassword = (_, value, callback) => {
    if (value && value !== 'pony') {
      callback('The password is not pony');
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
  return (
    <section>
      {props.value.match(props.regex) ? 'good' : 'bad'} {props.children}
    </section>
  );
}
