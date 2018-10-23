import { Button, Col, Input } from 'antd';
import React, { ChangeEvent } from 'react';

interface Props {
  onSubmit: (state) => void;
  query: string | null;
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
          <p>My name is</p>
          <Input
            data-qa="name"
            onChange={this.updateState('name')}
            placeholder={'Name'}
          />
          <div style={{ margin: '24px 0' }} />
          <p>I couldn’t find anything on</p>
          <Input
            data-qa="query"
            defaultValue={this.props.query}
            onChange={this.updateState('query')}
            placeholder={this.props.query}
          />
          <div style={{ margin: '24px 0' }} />
          <p>And you can send me suggestions to</p>
          <Input
            data-qa="email-address"
            onChange={this.updateState('mailAddress')}
            placeholder={'Email address'}
          />
          <div style={{ margin: '24px 0' }} />
          <p>Anything else you’d like us to know about this search?</p>
          <Input
            data-qa="information"
            onChange={this.updateState('information')}
            placeholder={
              'Other extra information relevant to your search eg type of subject, age group, etc'
            }
          />
          <div style={{ margin: '24px 0' }} />
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
