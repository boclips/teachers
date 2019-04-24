import React from 'react';

interface ErrorAnnouncementProps {
  error: object;
}

export class ErrorAnnouncement extends React.Component<ErrorAnnouncementProps> {
  public render() {
    return (
      <section role="alert" aria-live="assertive">
        {this.props.error && (
          <p>
            There are {Object.keys(this.props.error).length} errors in the form.
          </p>
        )}
        {this.props.error && this.renderErrors()}
      </section>
    );
  }

  private renderErrors() {
    return (
      <ul className="errors-list">
        {Object.keys(this.props.error).map(field => (
          <li key={field}>
            {field}: {this.props.error[field].errors[0].message}
          </li>
        ))}
      </ul>
    );
  }
}
