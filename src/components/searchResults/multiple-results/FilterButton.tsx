import { Button, Modal } from 'antd';
import React from 'react';

interface State {
  visible: boolean;
}

export default class FilterButton extends React.Component<{}, State> {
  constructor(props: never) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private handleOpen = () => {
    this.setState({
      visible: true,
    });
  };

  private handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  public render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen} data-qa="open-filter-modal" />
        <Modal
          cancelText="Cancel"
          onCancel={this.handleCancel}
          visible={this.state.visible}
        />
      </React.Fragment>
    );
  }
}
