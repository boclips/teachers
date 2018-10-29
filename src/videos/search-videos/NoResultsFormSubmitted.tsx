import React from 'react';

class NoResultsFormSubmitted extends React.PureComponent {
  public render() {
    return (
      <section>
        <div className="form-submitted">
          <h1>Thanks for sharing your search query with us</h1>
          <p>
            We’ll get back to you with some video suggestions as soon as possible.
          </p>
        </div>
      </section>
    );
  }
}

export default NoResultsFormSubmitted;
