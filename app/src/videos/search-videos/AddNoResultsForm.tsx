import { Button, Col, Input } from 'antd';
import React, { ChangeEvent } from 'react';

interface Props {
  onSubmit: (state) => void;
  query: string | null;
  validEmail: boolean;
  validQuery: boolean;
}

class AddNoResultsForm extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: 'Name',
      query: this.props.query,
      mailAddress: '',
      information: '',
    };
  }

  private updateState = key => (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  private submit = () => {
    this.props.onSubmit(this.state);
  };

  public render() {
    return (
      <section>
        <Col data-qa="add-no-results-form">
          <p className="description">My name is (optional)</p>
          <Input
            data-qa="name"
            onChange={this.updateState('name')}
            placeholder={'Name'}
          />
          <p className="description">I couldn’t find anything on</p>
          <Input
            data-qa="query"
            defaultValue={this.props.query}
            onChange={this.updateState('query')}
            placeholder={this.props.query}
          />
          {!this.props.validQuery && (
            <p className="alert-message-invalid">
              Please enter your search query
            </p>
          )}
          <p className="description">And you can send me suggestions to</p>
          <Input
            data-qa="email-address"
            onChange={this.updateState('mailAddress')}
            placeholder={'Email address'}
          />
          {!this.props.validEmail && (
            <p className="alert-message-invalid">Email address is not valid</p>
          )}
          <p className="description">
            Anything else you’d like us to know about this search? (optional)
          </p>
          <Input
            data-qa="information"
            onChange={this.updateState('information')}
            placeholder={
              'Other extra information relevant to your search e.g. type of subject, age group, etc.'
            }
          />
          <Button
            type={'primary'}
            data-qa="no-results-submit"
            color="primary"
            onClick={this.submit}
          >
            Contact us
          </Button>
        </Col>
      </section>
    );
  }
}

export default AddNoResultsForm;
