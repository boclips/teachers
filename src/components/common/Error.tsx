import React from 'react';
import noResultsIllustration from 'resources/images/no-results-illustration.png';

export default class Error extends React.Component {
  public render() {
    return (
      <section className="ant-layout-content error">
        <div className="ant-col-12">
          <img
            className="ant-col-20"
            src={noResultsIllustration}
            alt="No results illustration"
          />
        </div>
        <div className="ant-col-12 error-message">
          <div>
            <h1>Oops!!</h1>
            <p>
              Friendly error description goes here.
              <br />
              <br />
              You can start a new search in the top bar or <br />
              <a href="/">return to the homepage</a>
            </p>
          </div>
        </div>
      </section>
    );
  }
}
