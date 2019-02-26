import { Button, Icon, Input } from 'antd';
import React from 'react';
import './CollectionTitle.less';

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
      <section className="collection-title__container">
        <h1 data-qa="collection-name" className="text--secondary">
          {this.state.title}
        </h1>
        <span data-qa="collection-name-edit" onClick={this.handleOnEditClick}>
          <Icon className="collection-title__edit" theme="filled" type="edit" />
        </span>
      </section>
    );
  }

  private renderInEditingState() {
    return (
      <section className="collection-title__input-container">
        <Input
          data-qa="collection-name-edit-input"
          className="collection-title__input"
          value={this.state.title}
          onChange={this.handleInputChange}
          onPressEnter={this.handleOnDoneClick}
          alt="Rename this collection"
        />
        <Button
          className="empty"
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

  private handleInputChange = event => {
    if (event && event.target) {
      const value = event.target.value;
      this.setState(() => ({ title: value }));
    }
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
