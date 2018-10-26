import { Button, Col, Input } from 'antd';
import React, { ChangeEvent } from 'react';
import alert from "../../images/round-error-icon.svg";

const { TextArea } = Input;
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
          <p className="form-title">My name is <span>(optional)</span></p>
          <Input
            data-qa="name"
            onChange={this.updateState('name')}
            placeholder={'Name'}
          />
          <div className="alert-placeholder">
          </div>
          <p className="form-title">I couldn’t find anything on</p>
          <Input
            data-qa="query"
            defaultValue={this.props.query}
            onChange={this.updateState('query')}
            placeholder={this.props.query}
          />
          <div className="alert-placeholder">
            {!this.props.validQuery && (
              <div>
                <img src={alert}/>
                <p className="alert-message-invalid">
                Please enter your search query
              </p>
              </div>
          )}
          </div>
          <p className="form-title">And you can send me suggestions to</p>
          <Input
            data-qa="email-address"
            onChange={this.updateState('mailAddress')}
            placeholder={'Email address'}
          />
          <div className="alert-placeholder">
          {!this.props.validEmail && (
            <p className="alert-message-invalid">Email address is not valid</p>
          )}
          </div>
          <p className="form-title">
            Anything else you’d like us to know about this search? <span>(optional)</span>
          </p>
          <TextArea
            data-qa="information"
            onChange={this.updateState('information')}
            placeholder={
              'Other extra information relevant to your search e.g. type of subject, age group, etc.'
            }
            autosize={{ minRows: 3, maxRows: 3 }}
          />
          <div className="alert-placeholder">
          </div>
          <Button
            type={'primary'}
            data-qa="no-results-submit"
            color="primary"
            onClick={this.submit}
            size={"large"}
          >
            Contact us
          </Button>
        </Col>
      </section>
    );
  }
}

export default AddNoResultsForm;
