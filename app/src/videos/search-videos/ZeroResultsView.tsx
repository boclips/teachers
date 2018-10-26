import React from "react";
import noResultsIllustration from "../../images/no-results-illustration.png";

import AddNoResultsForm from "./AddNoResultsForm";
//import axios from 'axios';
import { Links } from "../../links/Links";
import NoResultsFormSubmitted from "./NoResultsFormSubmitted";

interface Props {
  query: string | null;
  links: Links;
}

interface State {
  validEmail: boolean;
  validQuery: boolean;
  isFormSubmitted: boolean;
}

export default class ZeroResultsView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      validEmail: true,
      validQuery: true,
      isFormSubmitted: false
    };
  }

  private checkValidity = state => {
    if (state.query === "") {
      console.log("invalid query");
      this.setState({
        validQuery: false
      });
    } else {
      this.setState({
        validQuery: true
      });
    }
    if (state.mailAddress.indexOf("@") < 0) {
      this.setState({
        validEmail: false
      });
    } else {
      this.setState({
        validEmail: true
      });
    }
  };

  private submitForm = state => {
    this.checkValidity(state);
    if (this.state.validEmail && this.state.validQuery) {
      this.setState({
        isFormSubmitted: true
      });
      console.log("sending feedback email to boclips with following state:");
      console.log(state);
      // const noSearchResultEvent = {
      //   name: state.name,
      //   email: state.mailAddress,
      //   query: state.query,
      //   description: state.information
      // };
      // axios.post(noSearchResultEvent);

    }
  };

  public render() {
    return (
      <section className="ant-layout-content zero-results">
        <div className="ant-col-12">
          <img className="ant-col-20" src={noResultsIllustration}/>
        </div>
        <div className="ant-col-12">
          <h1 data-qa="search-zero-results">
            Oops, we couldn’t find any results that matched your search for{" "}
            <em>{this.props.query}</em>
          </h1>
          <p className="description" data-qa="description">
            We’d love to help you find the perfect videos to use in class. Let
            us know what you are looking for and we’ll get back to you with some
            suggestions.
          </p>
          {!this.state.isFormSubmitted &&
          <AddNoResultsForm
            onSubmit={this.submitForm}
            query={this.props.query}
            validQuery={this.state.validQuery}
            validEmail={this.state.validEmail}
          />
          }
          {this.state.isFormSubmitted &&
          <NoResultsFormSubmitted/>
          }
        </div>
      </section>
    );
  }
}
