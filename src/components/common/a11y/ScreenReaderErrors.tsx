import React from 'react';
import './ScreenReaderErrors.less';

interface Props {
  errors: ScreenReaderError[];
}

export class ScreenReaderErrors extends React.Component<Props> {
  public render() {
    return (
      <section
        role="alert"
        aria-live="assertive"
        className="screen-reader-errors"
      >
        <p>
          There are {Object.keys(this.props.errors).length} errors in the form.
        </p>
        {this.renderErrors()}
      </section>
    );
  }

  private renderErrors() {
    return (
      <ul data-qa="errors-list" className="screen-reader-errors__list">
        {this.props.errors.map((error) => (
          <li data-qa="error" key={error.field}>
            {error.field}: {error.message}
          </li>
        ))}
      </ul>
    );
  }
}

export interface ScreenReaderError {
  field: string;
  message: string;
}
