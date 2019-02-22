import { Button, Input } from 'antd';
import React from 'react';

export interface Props {
  title: string;
  onEdit: (title: string) => void;
}

interface State {
  editing: boolean;
  title: string;
}

export class CollectionTitle extends React.Component<Props, State> {
  public state = {
    editing: false,
    title: this.props.title,
  };

  public render() {
    return this.state.editing
      ? this.renderInEditingState()
      : this.renderInViewingState();
  }

  private renderInViewingState() {
    return (
      <section>
        <h2 data-qa="collection-name">{this.state.title}</h2>
        <span data-qa="collection-name-edit" onClick={this.handleOnEditClick}>
          edit
        </span>
      </section>
    );
  }

  private renderInEditingState() {
    return (
      <section>
        <Input
          data-qa="collection-name-edit-input"
          value={this.state.title}
          onChange={this.handleInputChange}
          alt="Rename this collection"
        />
        <Button
          data-qa="collection-name-edit-cancel"
          onClick={this.handleOnCancelClick}
        >
          Cancel
        </Button>
        <Button
          data-qa="collection-name-edit-submit"
          onClick={this.handleOnDoneClick}
        >
          Done
        </Button>
      </section>
    );
  }

  private handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({ title: event.target.value }));
  };

  private handleOnEditClick = () => {
    this.setState({ editing: true });
  };

  private handleOnCancelClick = () => {
    this.setState({ editing: false, title: this.props.title });
  };

  private handleOnDoneClick = () => {
    this.props.onEdit(this.state.title);
    this.setState({ editing: false });
  };
}
