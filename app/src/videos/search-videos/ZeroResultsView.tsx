import React from 'react';
import noResultsIllustration from '../../images/no-results-illustration.png';

import AddNoResultsForm from './AddNoResultsForm';

interface Props {
  query: string | null;
}

export default class ZeroResultsView extends React.Component<Props> {
  private submitForm = state => {
    console.log('sending feedback email to boclips with following state:');
    console.log(state);
  };

  public render() {
    return (
      <section className="container">
        <img className="col-md-6" src={noResultsIllustration} />
        <div className="col-md-6">
          <h2 data-qa="search-zero-results">
            Oops, we couldn’t find any results that matched your search for{' '}
            <em>{this.props.query}</em>
          </h2>
          <p data-qa="description">
            We’d love to help you find the perfect videos to use in class. Let
            us know what you are looking for and we’ll get back to you with some
            suggestions.
          </p>
        </div>
        <AddNoResultsForm onSubmit={this.submitForm} query={this.props.query} />
      </section>
    );
  }
}
