import { message } from 'antd';
import axios from 'axios';
import React from 'react';
import noResultsIllustration from '../../../../resources/images/no-results-illustration.png';
import NoResultsForm from '../../../components/searchResults/no-results/NoResultsForm';
import NoResultsFormSubmitted from '../../../components/searchResults/no-results/NoResultsFormSubmitted';
import { Links } from '../../../services/links/Links';

interface Props {
  query: string | null;
  links: Links;
}

interface State {
  isFormSubmitted: boolean;
}

export default class NoResultsView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isFormSubmitted: false,
    };
  }

  private renderFormSubmittedView = (data: FormData) => {
    axios
      .post(this.props.links.createNoSearchResultsEvent.getOriginalLink(), data)
      .then(() => {
        this.setState({
          isFormSubmitted: true,
        });
      })
      .catch(() => {
        message.error('Ooops something went wrong... Please try again.');
      });
  };

  public render() {
    return (
      <section className="ant-layout-content zero-results">
        <div className="ant-col-12">
          <img className="ant-col-20" src={noResultsIllustration} />
        </div>
        <div className="ant-col-12">
          {!this.state.isFormSubmitted && (
            <div>
              <h1 data-qa="search-zero-results">
                Oops, we couldn’t find any results that matched your search for{' '}
                <em>{this.props.query}</em>
              </h1>
              <p className="description" data-qa="description">
                We’d love to help you find the perfect videos to use in class.
                Let us know what you are looking for and we’ll get back to you
                with some suggestions.
              </p>
            </div>
          )}
          {!this.state.isFormSubmitted && (
            <NoResultsForm
              onSuccessfulSubmit={this.renderFormSubmittedView}
              query={this.props.query}
            />
          )}
          {this.state.isFormSubmitted && <NoResultsFormSubmitted />}
        </div>
      </section>
    );
  }
}
