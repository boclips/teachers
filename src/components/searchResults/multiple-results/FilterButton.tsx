import { Button, Modal } from 'antd';
import React from 'react';
import FilterButtonForm from './FilterButtonForm';

interface FilterRequest {
  duration: {
    min: number;
    max: number;
  };
}

interface DispatchProps {
  onSubmit: (FilterRequest) => void;
}

interface State {
  visible: boolean;
}

export default class FilterButton extends React.Component<
  DispatchProps,
  State
> {
  private formRef: any;
  constructor(props: DispatchProps) {
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

  private handleOk = () => {
    this.setState({
      visible: false,
    });

    const form = this.formRef.props.form;

    form.validateFields((_, values) => {
      this.props.onSubmit({ duration: values.duration });
    });
  };

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  public render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen} data-qa="open-filter-modal" />
        <Modal
          cancelText="Cancel"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.visible}
        >
          <FilterButtonForm wrappedComponentRef={this.saveFormRef} />
        </Modal>
      </React.Fragment>
    );
  }
}
