import { Button, Col, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React from 'react';

const { TextArea } = Input;
const FormItem = Form.Item;

interface NoResultsFormData {
  name: string;
  query: string;
  email: string;
  description: string;
}

interface Props {
  onSuccessfulSubmit: (NoResultsFormData) => void;
  query: string | null;
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class NoResultsForm extends React.PureComponent<Props & FormComponentProps> {
  constructor(props: Props & FormComponentProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.form.validateFields();
    this.props.form.setFieldsValue({
      query: this.props.query,
    });
  }

  public handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((_, values) => {
      const data = values as NoResultsFormData;
      this.props.onSuccessfulSubmit(data);
    });
  };

  public render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const emailError = isFieldTouched('email') && getFieldError('email');

    return (
      <Form
        data-qa="no-results-form"
        onSubmit={this.handleSubmit}
        className="login-form"
      >
        <Col data-qa="add-no-results-form">
          <p className="form-title">
            My name is <span>(optional)</span>
          </p>
          <FormItem>
            {getFieldDecorator('name')(
              <Input data-qa="name" placeholder={'Name'} />,
            )}
          </FormItem>
          <p className="form-title">I couldn’t find anything on</p>
          <FormItem>
            {getFieldDecorator('query', {
              rules: [
                { required: true, message: 'Please enter your search query' },
              ],
            })(<Input data-qa="query" placeholder={this.props.query} />)}
          </FormItem>
          <p className="form-title">And you can send me suggestions to</p>
          <FormItem
            validateStatus={emailError ? 'error' : 'success'}
            help={emailError || ''}
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Email address is not valid',
                },
                {
                  required: true,
                  message: 'Please input your email address!',
                },
              ],
            })(<Input data-qa="email-address" placeholder={'Email address'} />)}
          </FormItem>
          <p className="form-title">
            Anything else you’d like us to know about this search?{' '}
            <span>(optional)</span>
          </p>
          <FormItem>
            {getFieldDecorator('description')(
              <TextArea
                data-qa="description"
                placeholder={
                  'Other extra information relevant to your search e.g. type of subject, age group, etc.'
                }
                autosize={{ minRows: 3, maxRows: 3 }}
              />,
            )}
          </FormItem>
          <Button
            type={'primary'}
            data-qa="no-results-submit"
            color="primary"
            size={'large'}
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Contact us
          </Button>
        </Col>
      </Form>
    );
  }
}

export default Form.create<Props & FormComponentProps>()(NoResultsForm);
