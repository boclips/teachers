import React from 'react';

interface ErrorAnnouncementProps {
  error: object;
}

export class ErrorAnnouncement extends React.Component<ErrorAnnouncementProps> {
  private errorMessage;

  public componentDidMount() {
    this.errorMessage.focus();
  }

  public render() {
    return (
      <section ref={c => (this.errorMessage = c)}>
        {this.props.error ? (
          <p>There are {Object.keys(this.props.error).length} errors.</p>
        ) : (
          <p />
        )}
      </section>
    );
  }

  // private renderErrors() {
  //   return
  //       {Object.keys(this.props.error).forEach(field => {
  //         <li>{field}: {this.props.error[field]}</li>
  //       });}
  // }
}
